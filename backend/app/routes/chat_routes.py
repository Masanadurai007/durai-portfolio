from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter(prefix="/chat", tags=["Durai Chat Agent"])


@router.post("", response_model=ChatResponse)
async def send_message(payload: ChatRequest, db: AsyncSession = Depends(get_db)):
    """Send a message to the Durai LangGraph chat agent and get a reply.

    Runs the full graph: intent classification → knowledge retrieval (RAG)
    → response generation → conditional lead capture.
    """
    service = ChatService(db)
    return await service.handle_message(payload)
