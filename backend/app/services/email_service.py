import asyncio
import smtplib
from email.mime.text import MIMEText

from app.core.config import settings
from app.models.lead import Lead


def _send_email_sync(lead: Lead) -> None:
    if not (settings.smtp_host and settings.smtp_user and settings.smtp_password):
        return  # Email not configured — lead is still saved to the database

    body = (
        f"New lead from the portfolio site\n\n"
        f"Source: {lead.source}\n"
        f"Name: {lead.name}\n"
        f"Email: {lead.email}\n"
        f"Subject: {lead.subject or '(none)'}\n\n"
        f"Message:\n{lead.message}\n"
    )
    msg = MIMEText(body)
    msg["Subject"] = f"New portfolio lead — {lead.name}"
    msg["From"] = settings.smtp_user
    msg["To"] = settings.notify_email

    with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as server:
        server.starttls()
        server.login(settings.smtp_user, settings.smtp_password)
        server.send_message(msg)


async def send_lead_notification(lead: Lead) -> None:
    """Fire-and-forget email notification — failures never block lead saving."""
    try:
        await asyncio.to_thread(_send_email_sync, lead)
    except Exception as exc:  # noqa: BLE001
        print(f"[email_service] Failed to send notification: {exc}")
