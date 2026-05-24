# WhatsApp Booking Assistant — Setup Guide

## Architecture

```
Customer (WhatsApp) → Meta Cloud API → [Your Server on Cloud Run]
                                              │
                                    Claude AI (conversation)
                                              │
                                    Google Sheets (bookings)
```

## Step 1 — Meta WhatsApp Cloud API (free)

1. Go to https://developers.facebook.com and create a **Business App**.
2. Add the **WhatsApp** product to your app.
3. Under *WhatsApp → API Setup*:
   - Copy your **Phone Number ID** → `WHATSAPP_PHONE_NUMBER_ID`
   - Generate a **Permanent Access Token** → `WHATSAPP_TOKEN`
4. Under *WhatsApp → Configuration*:
   - Set **Callback URL** to `https://YOUR_DOMAIN/webhook`
   - Set **Verify Token** to anything you choose → `WEBHOOK_VERIFY_TOKEN`
   - Subscribe to the **messages** field.

## Step 2 — Google Sheets (free)

1. Create a new Google Sheet. The app auto-creates the **Bookings** tab.
2. Copy the Sheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   → `GOOGLE_SHEETS_ID`
3. Go to https://console.cloud.google.com:
   - Create a project → Enable **Google Sheets API** and **Google Drive API**.
   - Create a **Service Account** → Download the JSON key → save as `service_account.json`.
4. Share your Google Sheet with the service account email (Editor role).

## Step 3 — Anthropic API Key

1. Go to https://console.anthropic.com → API Keys → Create key.
2. Copy it → `ANTHROPIC_API_KEY`

## Step 4 — Deploy to Google Cloud Run (cheapest option)

```bash
# Install gcloud CLI, then:
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Build and deploy
gcloud run deploy whatsapp-booking \
  --source ./whatsapp-booking \
  --region asia-southeast1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars "WHATSAPP_TOKEN=...,WHATSAPP_PHONE_NUMBER_ID=...,WEBHOOK_VERIFY_TOKEN=...,ANTHROPIC_API_KEY=...,GOOGLE_SHEETS_ID=...,BUSINESS_NAME=My Business,BUSINESS_SERVICES=Haircut,BUSINESS_HOURS=Mon-Fri 9am-6pm" \
  --set-secrets "GOOGLE_SERVICE_ACCOUNT_JSON=google-sa-json:latest"
```

> Cloud Run charges only when requests are processed (~$0 for low volume).
> Free tier: 2 million requests/month.

## Step 5 — Set Webhook URL in Meta

After deploy, Cloud Run gives you a URL like:
`https://whatsapp-booking-xxxx-as.a.run.app`

Go back to Meta Developer Console → WhatsApp → Configuration and set:
- Callback URL: `https://whatsapp-booking-xxxx-as.a.run.app/webhook`

## Local Development

```bash
cd whatsapp-booking
cp .env.example .env
# Fill in .env with your values

pip install -r requirements.txt
uvicorn main:app --reload --port 8080

# Expose locally using cloudflared (free) or ngrok:
cloudflared tunnel --url http://localhost:8080
```

## Environment Variables

| Variable | Description |
|---|---|
| `WHATSAPP_TOKEN` | Meta permanent access token |
| `WHATSAPP_PHONE_NUMBER_ID` | Meta phone number ID |
| `WEBHOOK_VERIFY_TOKEN` | Secret string for webhook verification |
| `ANTHROPIC_API_KEY` | Your Anthropic API key |
| `GOOGLE_SHEETS_ID` | Google Sheet ID from the URL |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Path to JSON file OR raw JSON string |
| `BUSINESS_NAME` | Your business name |
| `BUSINESS_SERVICES` | Comma-separated list of services |
| `BUSINESS_HOURS` | Human-readable business hours |
| `SLOT_DURATION_MINUTES` | Appointment slot length (default: 60) |

## What the Bot Can Do

- **Check availability** — "Are you free on Friday at 3pm?"
- **Book appointment** — "I'd like a haircut on Monday at 10am"
- **View bookings** — "Show my bookings"
- **Cancel booking** — "Cancel booking BK003"
- **Reset conversation** — Customer types "reset"

## Google Sheet Structure (auto-created)

| ID | Name | Phone | Service | Date | Time | Status | Notes | Created At |
|---|---|---|---|---|---|---|---|---|
| BK001 | Jane Doe | 60123456789 | Haircut | 2026-05-27 | 10:00 | Confirmed | | 2026-05-24 09:00:00 |
