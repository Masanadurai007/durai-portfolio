"""
Assembles the Durai agent as a LangGraph StateGraph:

    START → detect_intent → retrieve → respond → lead_capture → END

This module exposes a single compiled graph instance (`durai_graph`) that the
chat service invokes per request.
"""

from langgraph.graph import StateGraph, END

from app.agents.nodes import (
    intent_node,
    retrieve_node,
    respond_node,
    lead_capture_node,
)
from app.agents.state import DuraiAgentState


def build_durai_graph():
    graph = StateGraph(DuraiAgentState)

    graph.add_node("detect_intent", intent_node)
    graph.add_node("retrieve", retrieve_node)
    graph.add_node("respond", respond_node)
    graph.add_node("lead_capture", lead_capture_node)

    graph.set_entry_point("detect_intent")
    graph.add_edge("detect_intent", "retrieve")
    graph.add_edge("retrieve", "respond")
    graph.add_edge("respond", "lead_capture")
    graph.add_edge("lead_capture", END)

    return graph.compile()


durai_graph = build_durai_graph()