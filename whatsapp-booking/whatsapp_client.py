import httpx
from config import WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID

BASE_URL = f"https://graph.facebook.com/v21.0/{WHATSAPP_PHONE_NUMBER_ID}/messages"
HEADERS = {
    "Authorization": f"Bearer {WHATSAPP_TOKEN}",
    "Content-Type": "application/json",
}


async def send_text(to: str, message: str) -> dict:
    payload = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": to,
        "type": "text",
        "text": {"body": message},
    }
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.post(BASE_URL, json=payload, headers=HEADERS)
        resp.raise_for_status()
        return resp.json()


async def mark_as_read(message_id: str) -> None:
    payload = {
        "messaging_product": "whatsapp",
        "status": "read",
        "message_id": message_id,
    }
    async with httpx.AsyncClient(timeout=5) as client:
        await client.post(BASE_URL, json=payload, headers=HEADERS)
