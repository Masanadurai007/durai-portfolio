from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.schemas.lead import LeadCreate, LeadResponse
from app.services.lead_service import LeadService

router = APIRouter(prefix="/leads", tags=["Leads / Contact"])

@router.post("", response_model=LeadResponse, status_code=201)
async def create_lead(payload: LeadCreate, db: AsyncSession = Depends(get_db)):
    """Submit a project request — used by the Contact form."""
    service = LeadService(db)
    return await service.submit_lead(payload)

@router.get("", response_model=list[LeadResponse])
async def list_leads(
    limit: int = Query(default=100, le=200),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    """List submitted leads — intended for Durai's own admin use."""
    service = LeadService(db)
    return await service.list_leads(limit=limit, offset=offset)
