import logging
from datetime import date
from fastapi import FastAPI, Request, Response, HTTPException, Query
from config import WEBHOOK_VERIFY_TOKEN
import whatsapp_client
import ai_agent

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

app = FastAPI(title="WhatsApp Booking Assistant")


@app.get("/webhook")
async def verify_webhook(
    hub_mode: str = Query(None, alias="hub.mode"),
    hub_verify_token: str = Query(None, alias="hub.verify_token"),
    hub_challenge: str = Query(None, alias="hub.challenge"),
):
    """Meta webhook verification handshake."""
    if hub_mode == "subscribe" and hub_verify_token == WEBHOOK_VERIFY_TOKEN:
        logger.info("Webhook verified by Meta.")
        return Response(content=hub_challenge, media_type="text/plain")
    raise HTTPException(status_code=403, detail="Verification token mismatch")


@app.post("/webhook")
async def receive_message(request: Request):
    """Receive incoming WhatsApp messages from Meta."""
    body = await request.json()
    logger.info("Incoming webhook: %s", body)

    try:
        entry = body["entry"][0]
        change = entry["changes"][0]["value"]

        # Ignore delivery receipts and status updates
        if "messages" not in change:
            return {"status": "ok"}

        message = change["messages"][0]
        customer_phone = message["from"]
        message_id = message["id"]

        # Only handle text messages for now
        if message.get("type") != "text":
            await whatsapp_client.send_text(
                customer_phone,
                "Sorry, I can only process text messages right now. Please type your request."
            )
            return {"status": "ok"}

        text = message["text"]["body"].strip()
        today = date.today().isoformat()

        # Mark as read so customer sees double-tick
        await whatsapp_client.mark_as_read(message_id)

        # Reset conversation if customer explicitly wants to start over
        if text.lower() in ("reset", "restart", "start over", "new"):
            ai_agent.clear_history(customer_phone)
            await whatsapp_client.send_text(customer_phone, "Conversation reset! How can I help you today?")
            return {"status": "ok"}

        reply = await ai_agent.handle_message(customer_phone, text, today)
        await whatsapp_client.send_text(customer_phone, reply)

    except (KeyError, IndexError) as e:
        logger.warning("Unexpected payload structure: %s", e)

    return {"status": "ok"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
