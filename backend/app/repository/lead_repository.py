import uuid
from typing import Optional, Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.lead import Lead
from app.schemas.lead import LeadCreate

class LeadRepository:
    """Data-access layer for Lead records. Routes/services never touch
    SQLAlchemy directly — they go through this repository."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, payload: LeadCreate) -> Lead:
        lead = Lead(
            name=payload.name,
            email=payload.email,
            subject=payload.subject,
            message=payload.message,
            source=payload.source,
        )
        self.db.add(lead)
        await self.db.commit()
        await self.db.refresh(lead)
        return lead

    async def get_by_id(self, lead_id: uuid.UUID) -> Optional[Lead]:
        result = await self.db.execute(select(Lead).where(Lead.id == lead_id))
        return result.scalar_one_or_none()

    async def list_all(self, limit: int = 100, offset: int = 0) -> Sequence[Lead]:
        result = await self.db.execute(
            select(Lead).order_by(Lead.created_at.desc()).limit(limit).offset(offset)
        )
        return result.scalars().all()
