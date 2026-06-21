import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, ConfigDict

class LeadCreate(BaseModel):
    """Payload for creating a new lead — used by both the contact form
    and the chat agent's lead-capture node."""

    name: str = Field(..., min_length=2, max_length=150)
    email: EmailStr
    subject: Optional[str] = Field(default=None, max_length=255)
    message: str = Field(..., min_length=5)
    source: str = Field(default="contact_form")

class LeadResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    email: str
    subject: Optional[str] = None
    message: str
    source: str
    status: str
    created_at: datetime
