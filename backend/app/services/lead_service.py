from sqlalchemy.ext.asyncio import AsyncSession

from app.repository.lead_repository import LeadRepository
from app.schemas.lead import LeadCreate, LeadResponse
from app.services.email_service import send_lead_notification


class LeadService:
    """Business logic for contact-form / lead submissions."""

    def __init__(self, db: AsyncSession):
        self.db = db
        self.lead_repo = LeadRepository(db)

    async def submit_lead(self, payload: LeadCreate) -> LeadResponse:
        lead = await self.lead_repo.create(payload)
        await send_lead_notification(lead)
        return LeadResponse.model_validate(lead)

    async def list_leads(self, limit: int = 100, offset: int = 0):
        leads = await self.lead_repo.list_all(limit=limit, offset=offset)
        return [LeadResponse.model_validate(l) for l in leads]
