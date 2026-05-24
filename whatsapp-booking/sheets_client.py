import json
import gspread
from google.oauth2.service_account import Credentials
from datetime import datetime, date
from config import GOOGLE_SHEETS_ID, GOOGLE_SERVICE_ACCOUNT_JSON

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

BOOKINGS_SHEET = "Bookings"
HEADERS = ["ID", "Name", "Phone", "Service", "Date", "Time", "Status", "Notes", "Created At"]


def _get_client() -> gspread.Client:
    if GOOGLE_SERVICE_ACCOUNT_JSON.endswith(".json"):
        creds = Credentials.from_service_account_file(GOOGLE_SERVICE_ACCOUNT_JSON, scopes=SCOPES)
    else:
        info = json.loads(GOOGLE_SERVICE_ACCOUNT_JSON)
        creds = Credentials.from_service_account_info(info, scopes=SCOPES)
    return gspread.authorize(creds)


def _get_sheet() -> gspread.Worksheet:
    client = _get_client()
    spreadsheet = client.open_by_key(GOOGLE_SHEETS_ID)
    try:
        sheet = spreadsheet.worksheet(BOOKINGS_SHEET)
    except gspread.WorksheetNotFound:
        sheet = spreadsheet.add_worksheet(title=BOOKINGS_SHEET, rows=1000, cols=len(HEADERS))
        sheet.append_row(HEADERS)
    return sheet


def _next_id(records: list[dict]) -> str:
    if not records:
        return "BK001"
    last_ids = [r.get("ID", "BK000") for r in records if r.get("ID", "").startswith("BK")]
    nums = [int(i[2:]) for i in last_ids if i[2:].isdigit()]
    return f"BK{(max(nums) + 1):03d}" if nums else "BK001"


def check_availability(date_str: str, time_str: str) -> dict:
    """Return whether a date/time slot is available."""
    try:
        sheet = _get_sheet()
        records = sheet.get_all_records()
        taken = [
            r for r in records
            if r.get("Date") == date_str
            and r.get("Time") == time_str
            and r.get("Status", "").lower() not in ("cancelled",)
        ]
        return {"available": len(taken) == 0, "date": date_str, "time": time_str}
    except Exception as e:
        return {"error": str(e)}


def get_available_slots(date_str: str) -> dict:
    """Return all available slots for a given date."""
    from config import BUSINESS_HOURS, SLOT_DURATION_MINUTES
    try:
        sheet = _get_sheet()
        records = sheet.get_all_records()
        booked_times = {
            r["Time"] for r in records
            if r.get("Date") == date_str
            and r.get("Status", "").lower() not in ("cancelled",)
        }
        # Build slot list from 9am-6pm (Mon-Fri), 9am-2pm Sat
        try:
            d = datetime.strptime(date_str, "%Y-%m-%d")
            weekday = d.weekday()  # 0=Mon, 6=Sun
        except ValueError:
            return {"error": "Invalid date format, use YYYY-MM-DD"}

        if weekday == 6:
            return {"available_slots": [], "message": "We are closed on Sundays."}

        end_hour = 14 if weekday == 5 else 18
        slots = []
        hour = 9
        minute = 0
        while hour < end_hour or (hour == end_hour and minute == 0):
            t = f"{hour:02d}:{minute:02d}"
            if t not in booked_times:
                slots.append(t)
            minute += SLOT_DURATION_MINUTES
            hour += minute // 60
            minute = minute % 60

        return {"date": date_str, "available_slots": slots}
    except Exception as e:
        return {"error": str(e)}


def create_booking(name: str, phone: str, service: str, date_str: str, time_str: str, notes: str = "") -> dict:
    """Create a new booking and return booking details."""
    try:
        sheet = _get_sheet()
        records = sheet.get_all_records()

        taken = [
            r for r in records
            if r.get("Date") == date_str
            and r.get("Time") == time_str
            and r.get("Status", "").lower() not in ("cancelled",)
        ]
        if taken:
            return {"error": f"The slot {date_str} at {time_str} is already taken. Please choose another time."}

        booking_id = _next_id(records)
        created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        row = [booking_id, name, phone, service, date_str, time_str, "Confirmed", notes, created_at]
        sheet.append_row(row)
        return {
            "success": True,
            "booking_id": booking_id,
            "name": name,
            "service": service,
            "date": date_str,
            "time": time_str,
            "status": "Confirmed",
        }
    except Exception as e:
        return {"error": str(e)}


def get_customer_bookings(phone: str) -> dict:
    """Return all bookings for a given phone number."""
    try:
        sheet = _get_sheet()
        records = sheet.get_all_records()
        bookings = [r for r in records if r.get("Phone") == phone]
        active = [b for b in bookings if b.get("Status", "").lower() != "cancelled"]
        return {"bookings": active, "total": len(active)}
    except Exception as e:
        return {"error": str(e)}


def cancel_booking(booking_id: str, phone: str) -> dict:
    """Cancel a booking by ID, verifying phone ownership."""
    try:
        sheet = _get_sheet()
        records = sheet.get_all_records()
        for idx, r in enumerate(records, start=2):  # row 1 is header
            if r.get("ID") == booking_id:
                if r.get("Phone") != phone:
                    return {"error": "This booking does not belong to your number."}
                if r.get("Status", "").lower() == "cancelled":
                    return {"error": "Booking is already cancelled."}
                sheet.update_cell(idx, HEADERS.index("Status") + 1, "Cancelled")
                return {"success": True, "booking_id": booking_id, "message": "Booking cancelled successfully."}
        return {"error": f"Booking {booking_id} not found."}
    except Exception as e:
        return {"error": str(e)}
