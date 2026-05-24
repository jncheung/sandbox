import os
from dotenv import load_dotenv

load_dotenv()

WHATSAPP_TOKEN = os.environ["WHATSAPP_TOKEN"]
WHATSAPP_PHONE_NUMBER_ID = os.environ["WHATSAPP_PHONE_NUMBER_ID"]
WEBHOOK_VERIFY_TOKEN = os.environ["WEBHOOK_VERIFY_TOKEN"]

ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]

GOOGLE_SHEETS_ID = os.environ["GOOGLE_SHEETS_ID"]
GOOGLE_SERVICE_ACCOUNT_JSON = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON", "service_account.json")

BUSINESS_NAME = os.environ.get("BUSINESS_NAME", "Our Business")
BUSINESS_SERVICES = os.environ.get("BUSINESS_SERVICES", "General Appointment")
BUSINESS_HOURS = os.environ.get("BUSINESS_HOURS", "Mon-Fri 9am-6pm, Sat 9am-2pm")
SLOT_DURATION_MINUTES = int(os.environ.get("SLOT_DURATION_MINUTES", "60"))
