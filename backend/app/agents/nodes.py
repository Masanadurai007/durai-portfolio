"""
Node functions for the Durai LangGraph agent.

Graph shape:

    intent_node → retrieve_node → respond_node → lead_capture_node → END

Each node appends its name to state["trace"] so the API response (and the
frontend UI) can visibly show the graph executing — this is itself part of
the portfolio's pitch: the chatbot is a real running LangGraph agent.
"""

import re
from typing import List

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_groq import ChatGroq

from app.agents.knowledge_base import format_knowledge_base
from app.agents.retriever import retriever
from app.agents.state import DuraiAgentState
from app.core.config import settings

_EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")

_HIRING_KEYWORDS = [
    "hire", "freelance", "project", "budget", "quote", "build me",
    "available", "rate", "cost", "pricing", "work together", "need a",
    "looking for", "can you build", "interested in working",
]


def _get_llm():
    return ChatGroq(
        api_key=settings.groq_api_key,
        model=settings.groq_model,
        temperature=0.6,
        max_tokens=500,
    )


def intent_node(state: DuraiAgentState) -> DuraiAgentState:
    """Classify whether the message signals hiring intent, plain conversation,
    or is supplying lead details (name/email/project) mid-capture."""
    message = state["user_message"].lower()

    already_capturing = bool(state.get("lead_name") or state.get("lead_email"))
    has_hiring_signal = any(kw in message for kw in _HIRING_KEYWORDS)
    has_email = bool(_EMAIL_RE.search(message))

    if already_capturing or has_email:
        intent = "lead_capture"
    elif has_hiring_signal:
        intent = "hiring_interest"
    else:
        intent = "general"

    trace = state.get("trace", [])
    trace.append("intent")
    return {**state, "intent": intent, "trace": trace}


def retrieve_node(state: DuraiAgentState) -> DuraiAgentState:
    """Pull the most relevant knowledge-base entries for this query (RAG step)."""
    docs = retriever.retrieve(state["user_message"], top_k=4)
    trace = state.get("trace", [])
    trace.append("retrieve")
    return {**state, "retrieved_docs": docs, "trace": trace}


def respond_node(state: DuraiAgentState) -> DuraiAgentState:
    """Generate Durai's reply, grounded in retrieved knowledge, via the LLM."""
    trace = state.get("trace", [])
    trace.append("respond")

    if not settings.groq_api_key:
        reply = (
            "I'm Durai — my AI backend isn't fully configured yet (missing "
            "GROQ_API_KEY), but I can tell you I'm a Fullstack Developer and AI "
            "Engineer working with LangGraph, LangChain, RAG, FastAPI, Go, and "
            "React. Add a free Groq API key to the backend .env to bring me "
            "fully online."
        )
        return {**state, "reply": reply, "trace": trace}

    context_block = "\n\n".join(
        f"- {d['content']}" for d in state.get("retrieved_docs", [])
    )

    history_block = ""
    for turn in state.get("history", [])[-6:]:
        role = "User" if turn["role"] == "user" else "Durai"
        history_block += f"{role}: {turn['content']}\n"

#     system_prompt = f"""You are Durai (Masana Durai), a Fullstack Developer and AI
# Engineer from Chennai, India, speaking on your own portfolio website as a real-time
# AI agent grounded in your own facts. Speak in first person, casually and
# confidently, like a skilled freelancer chatting with a potential client. Keep
# replies concise (2-4 sentences unless asked for detail). Never invent facts about
# yourself beyond what's given below. If something genuinely isn't covered, say so
# honestly and offer to connect the visitor with the real Durai via the contact form
# or WhatsApp.

# Relevant facts about you for this question:
# {context_block}

# Recent conversation:
# {history_block}
# """
    system_prompt = f"""
    <ROLE>
        You are Durai (Masana Durai), a Fullstack Developer and AI Engineer from
        Chennai, India. You speak as a real-time AI agent embedded on your own
        portfolio website, talking directly to a visitor who may become a client.
    </ROLE> 

    <OBJECTIVE>
        Answer the visitor's question accurately using only the facts provided below,
        in a tone that makes them want to hire you — confident, sharp, and human, not
        like a corporate bio or a generic chatbot.
    </OBJECTIVE>

    <INSTRUCTIONS>
        1. Read the visitor's message and the relevant facts below.
        2. Answer in first person, as Durai.
        3. If the question is about hiring, availability, or starting a project,
        naturally invite them to share project details or use the contact
        form / WhatsApp.
        4. If the answer truly isn't in the facts provided, say so honestly in one
        sentence and redirect to the contact form or WhatsApp — never guess.
    </INSTRUCTIONS>
    <CONSTRAINTS>
        - Maximum 1-2 short sentences per reply. Never write a third sentence.
        - No bullet points, no lists, no headers, no multi-paragraph answers.
        - Never state or imply a specific number of years of experience — it is not
        provided to you. If asked, point to the Experience section instead of
        guessing a duration.
        - Never invent skills, projects, companies, or facts beyond what's given below.
        - Casual and confident tone — like a sharp freelancer texting a potential
        client, not a formal resume read aloud.
    </CONSTRAINTS>
    <FEW-SHOT EXAMPLES>
        Visitor: How many years of experience do you have?
        Durai: I don't put a number on it — check the Experience section for the full picture of where I've worked. Happy to talk through specifics if you tell me what you're building.

        Visitor: Can you build a RAG chatbot for my SaaS?
        Durai: Yeah, that's exactly the kind of thing I build — RAG pipelines grounded in real data are one of my core services. Tell me a bit about your product and I'll let you know how it'd fit together.

        Visitor: What's your hourly rate?
        Durai: I don't list rates publicly since it depends on project scope — best way is to share what you're building via the contact form and I'll get back to you with a quote.

        Visitor: Do you know Rust?
        Durai: Not something I've worked with — my stack is LangChain, LangGraph, FastAPI, Go, Node.js, and React. If Rust is a hard requirement, this probably isn't the right fit, but happy to discuss if there's flexibility.
    <FEW-SHOT EXAMPLES>

    Relevant facts about you for this question:
    {context_block}

    Recent conversation:
    {history_block}
"""

    llm = _get_llm()
    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=state["user_message"]),
    ]
    result = llm.invoke(messages)
    reply = result.content.strip()

    return {**state, "reply": reply, "trace": trace}


def lead_capture_node(state: DuraiAgentState) -> DuraiAgentState:
    """Conditionally extract name/email/project details across turns once
    hiring intent or an email address has been detected. Marks lead_ready
    True once all three slots are filled, so the API layer can persist it."""
    trace = state.get("trace", [])

    if state["intent"] not in ("hiring_interest", "lead_capture"):
        return {**state, "trace": trace}

    trace.append("lead_capture")
    message = state["user_message"]

    email_match = _EMAIL_RE.search(message)
    lead_email = state.get("lead_email") or (email_match.group(0) if email_match else None)

    # Light-touch name extraction: "I'm <Name>" / "my name is <Name>" / "I am <Name>"
    lead_name = state.get("lead_name")
    name_match = re.search(
        r"(?:i'?m|i\sam|my name is|this is|name's)\s+([A-Z][a-zA-Z]+(?:\s[A-Z][a-zA-Z]+){0,2})",
        message,
        re.IGNORECASE,
    )
    if not lead_name and name_match:
        candidate = name_match.group(1).strip()
        # Avoid false positives like "I am looking" or "I am interested"
        common_words = {"looking", "interested", "building", "working", "trying", "hoping"}
        if candidate.split()[0].lower() not in common_words:
            lead_name = candidate

    lead_project = state.get("lead_project")
    if not lead_project and len(message.strip()) > 15:
        lead_project = message

    lead_ready = bool(lead_name and lead_email and lead_project)

    return {
        **state,
        "lead_name": lead_name,
        "lead_email": lead_email,
        "lead_project": lead_project,
        "lead_ready": lead_ready,
        "trace": trace,
    }
