from typing import List, Optional, TypedDict


class DuraiAgentState(TypedDict, total=False):
    """Shared state threaded through every node of the Durai LangGraph agent."""

    session_id: str
    user_message: str
    history: List[dict]  # [{"role": "user"|"assistant", "content": str}, ...]

    intent: str  # "general" | "hiring_interest" | "lead_capture"
    retrieved_docs: List[dict]

    reply: str
    trace: List[str]  # node names executed, in order — surfaced to the UI

    # Lead-capture slot filling
    lead_name: Optional[str]
    lead_email: Optional[str]
    lead_project: Optional[str]
    lead_ready: bool
