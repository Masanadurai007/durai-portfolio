from typing import Optional, List, Literal

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    session_id: str = Field(..., description="Stable per-browser-session identifier")
    message: str = Field(..., min_length=1, max_length=2000)


class LeadCaptured(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    project: Optional[str] = None
    ready: bool = False
    """True once the agent has enough info (name + email + project) to save a lead."""


class ChatResponse(BaseModel):
    session_id: str
    reply: str
    lead_captured: Optional[LeadCaptured] = None
    trace: List[str] = Field(default_factory=list)
    """Node-execution trace, e.g. ['intent', 'retrieve', 'respond'] — surfaced in the UI
    to visibly demonstrate the LangGraph pipeline running."""


class ChatHistoryItem(BaseModel):
    role: Literal["user", "assistant"]
    content: str
