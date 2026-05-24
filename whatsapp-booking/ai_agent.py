import json
from anthropic import Anthropic
from config import ANTHROPIC_API_KEY, BUSINESS_NAME, BUSINESS_SERVICES, BUSINESS_HOURS
import sheets_client

client = Anthropic(api_key=ANTHROPIC_API_KEY)

# In-memory conversation history keyed by phone number.
# For production with multiple workers, replace with Redis.
_conversations: dict[str, list[dict]] = {}

TOOLS = [
    {
        "name": "check_availability",
        "description": "Check if a specific date and time slot is available for booking.",
        "input_schema": {
            "type": "object",
            "properties": {
                "date": {"type": "string", "description": "Date in YYYY-MM-DD format"},
                "time": {"type": "string", "description": "Time in HH:MM 24-hour format, e.g. 14:00"},
            },
            "required": ["date", "time"],
        },
    },
    {
        "name": "get_available_slots",
        "description": "Get all available time slots for a specific date.",
        "input_schema": {
            "type": "object",
            "properties": {
                "date": {"type": "string", "description": "Date in YYYY-MM-DD format"},
            },
            "required": ["date"],
        },
    },
    {
        "name": "create_booking",
        "description": "Create a confirmed appointment booking.",
        "input_schema": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "description": "Customer's full name"},
                "service": {"type": "string", "description": "Service or appointment type requested"},
                "date": {"type": "string", "description": "Date in YYYY-MM-DD format"},
                "time": {"type": "string", "description": "Time in HH:MM 24-hour format"},
                "notes": {"type": "string", "description": "Any additional notes or special requests"},
            },
            "required": ["name", "service", "date", "time"],
        },
    },
    {
        "name": "get_my_bookings",
        "description": "Retrieve all active bookings for the current customer.",
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "cancel_booking",
        "description": "Cancel an existing booking by its booking ID.",
        "input_schema": {
            "type": "object",
            "properties": {
                "booking_id": {"type": "string", "description": "The booking ID (e.g. BK001)"},
            },
            "required": ["booking_id"],
        },
    },
]

SYSTEM_PROMPT = f"""You are a friendly and professional booking assistant for {BUSINESS_NAME}.
Your job is to help customers book, check, and cancel appointments via WhatsApp.

Business details:
- Services offered: {BUSINESS_SERVICES}
- Business hours: {BUSINESS_HOURS}
- Today's date context will be provided in each message.

Guidelines:
- Be warm, concise, and helpful. Keep replies short (1-3 sentences + key info).
- Always confirm the customer's name, service, date, and time before creating a booking.
- After creating a booking always show the Booking ID so they can reference it later.
- If a slot is unavailable, proactively suggest alternatives using get_available_slots.
- Never invent availability — always call the tools to check real data.
- When listing available slots, group them neatly (morning / afternoon).
- For cancellations, always confirm the booking ID and ask for confirmation before cancelling.
- If the customer asks something outside your scope, politely redirect to booking topics.
"""


def _run_tool(tool_name: str, tool_input: dict, customer_phone: str) -> str:
    if tool_name == "check_availability":
        result = sheets_client.check_availability(tool_input["date"], tool_input["time"])
    elif tool_name == "get_available_slots":
        result = sheets_client.get_available_slots(tool_input["date"])
    elif tool_name == "create_booking":
        result = sheets_client.create_booking(
            name=tool_input["name"],
            phone=customer_phone,
            service=tool_input["service"],
            date_str=tool_input["date"],
            time_str=tool_input["time"],
            notes=tool_input.get("notes", ""),
        )
    elif tool_name == "get_my_bookings":
        result = sheets_client.get_customer_bookings(customer_phone)
    elif tool_name == "cancel_booking":
        result = sheets_client.cancel_booking(tool_input["booking_id"], customer_phone)
    else:
        result = {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result)


async def handle_message(customer_phone: str, customer_message: str, today: str) -> str:
    history = _conversations.setdefault(customer_phone, [])
    history.append({"role": "user", "content": f"[Today is {today}]\n{customer_message}"})

    # Agentic loop: keep calling Claude until it returns a final text response
    while True:
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1024,
            system=SYSTEM_PROMPT,
            tools=TOOLS,
            messages=history,
        )

        # Collect assistant content blocks
        assistant_content = response.content
        history.append({"role": "assistant", "content": assistant_content})

        if response.stop_reason == "end_turn":
            # Extract the final text reply
            for block in assistant_content:
                if hasattr(block, "text"):
                    return block.text
            return "I'm sorry, I couldn't generate a response. Please try again."

        if response.stop_reason == "tool_use":
            tool_results = []
            for block in assistant_content:
                if block.type == "tool_use":
                    output = _run_tool(block.name, block.input, customer_phone)
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": output,
                    })
            history.append({"role": "user", "content": tool_results})
            continue

        # Unexpected stop reason
        return "Something went wrong. Please try again."


def clear_history(customer_phone: str) -> None:
    _conversations.pop(customer_phone, None)
