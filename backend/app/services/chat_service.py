from sqlalchemy.ext.asyncio import AsyncSession

from app.agents.graph import durai_graph
from app.repository.chat_repository import ChatRepository
from app.repository.lead_repository import LeadRepository
from app.schemas.chat import ChatRequest, ChatResponse, LeadCaptured
from app.schemas.lead import LeadCreate


class ChatService:
    """Orchestrates a single turn of the Durai chat agent: load history,
    run the LangGraph graph, persist the turn, and persist a lead if the
    agent's lead_capture node determined one is ready."""

    def __init__(self, db: AsyncSession):
        self.db = db
        self.chat_repo = ChatRepository(db)
        self.lead_repo = LeadRepository(db)

    async def handle_message(self, payload: ChatRequest) -> ChatResponse:
        history_records = await self.chat_repo.get_history(payload.session_id)
        history = [{"role": m.role, "content": m.content} for m in history_records]

        initial_state = {
            "session_id": payload.session_id,
            "user_message": payload.message,
            "history": history,
            "trace": [],
            "lead_name": None,
            "lead_email": None,
            "lead_project": None,
            "lead_ready": False,
        }

        result_state = durai_graph.invoke(initial_state)

        await self.chat_repo.add_message(payload.session_id, "user", payload.message)
        await self.chat_repo.add_message(payload.session_id, "assistant", result_state["reply"])

        lead_captured = None
        if result_state.get("lead_ready"):
            lead = await self.lead_repo.create(
                LeadCreate(
                    name=result_state["lead_name"],
                    email=result_state["lead_email"],
                    subject="Lead captured via Durai chat agent",
                    message=result_state["lead_project"],
                    source="chat_agent",
                )
            )
            lead_captured = LeadCaptured(
                name=lead.name,
                email=lead.email,
                project=lead.message,
                ready=True,
            )

        return ChatResponse(
            session_id=payload.session_id,
            reply=result_state["reply"],
            lead_captured=lead_captured,
            trace=result_state.get("trace", []),
        )
