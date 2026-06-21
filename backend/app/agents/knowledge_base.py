"""
Knowledge base grounding the Durai chat agent.
This is the single source of truth the LangGraph retrieval node searches over.
Edit this file to update what the agent knows about Masana Durai.
"""

KNOWLEDGE_BASE = [
    {
        "id": "identity",
        "topic": "who is Durai",
        "content": (
            "I'm Masana Durai — people call me Durai. I'm a Fullstack Developer and "
            "AI Engineer based in Chennai, India, working freelance. I focus on agentic "
            "AI systems, RAG pipelines, and fullstack products that are built to actually "
            "run in production, not just demo well."
        ),
    },
    {
        "id": "skills_ai",
        "topic": "AI and LLM skills",
        "content": (
            "On the AI side I work with LangChain, LangGraph, Retrieval-Augmented "
            "Generation (RAG), AWS Bedrock, large language models, agentic AI design, "
            "and prompt engineering. I build multi-agent systems with conditional "
            "routing, state checkpointing, and automatic retries."
        ),
    },
    {
        "id": "skills_backend",
        "topic": "backend and API skills",
        "content": (
            "For backend work I use FastAPI and Python as my primary stack, plus "
            "Golang for high-throughput services, and Node.js with Express for "
            "JavaScript-based APIs. I design RESTful APIs and microservices."
        ),
    },
    {
        "id": "skills_data",
        "topic": "databases",
        "content": (
            "I work with PostgreSQL as my primary relational database, including "
            "pgvector for embeddings in RAG pipelines, and MongoDB for document-based "
            "needs."
        ),
    },
    {
        "id": "skills_frontend",
        "topic": "frontend skills",
        "content": (
            "On the frontend I build with React.js, JavaScript, Tailwind CSS, and "
            "responsive, accessible UI."
        ),
    },
    {
        "id": "project_pipeline",
        "topic": "Multi-Agent Code Pipeline project",
        "content": (
            "One of my flagship projects is a Multi-Agent Code Pipeline built with "
            "LangGraph — three specialised agents (CodeAgent, ReviewAgent, "
            "ResearchAgent) that route conditionally, checkpoint state in PostgreSQL, "
            "and automatically retry up to three times on a failed Pylint review. "
            "It's built with FastAPI and AWS Bedrock as the LLM backend."
        ),
    },
    {
        "id": "project_image_gen",
        "topic": "AI Image Generator SaaS project",
        "content": (
            "I built a full-stack AI Image Generator SaaS — React frontend, Node.js "
            "and Express backend, MongoDB, JWT authentication, the ClipDrop API for "
            "generation, and a credit-based system with payment gateway integration."
        ),
    },
    {
        "id": "project_students_hub",
        "topic": "Students Hub Platform project",
        "content": (
            "I led frontend development on Students Hub, an educational platform "
            "with mentorship, events, and study materials, built with React.js, "
            "Node.js, Express, MongoDB, and Google OAuth. It won 1st place among "
            "126 teams at a Project Expo and was awarded a 10,000 rupee prize."
        ),
    },
    {
        "id": "experience",
        "topic": "work experience",
        "content": (
            "I'm currently working as an AI Engineer at Pentabay Softwares in "
            "Chennai, building production AI systems. Before that, I worked as a "
            "Software Engineer at Avasoft, where I built LangGraph multi-agent "
            "pipelines and FastAPI services backed by PostgreSQL and AWS Bedrock."
        ),
    },
    {
        "id": "achievements",
        "topic": "achievements and stats",
        "content": (
            "I've solved over 400 problems on LeetCode with a 1500+ rating, hold a "
            "5-star SQL rating on HackerRank, and won 1st place among 126 teams at "
            "a Project Expo."
        ),
    },
    {
        "id": "services",
        "topic": "freelance services offered",
        "content": (
            "As a freelancer I offer four main services: Agentic AI systems "
            "(multi-agent pipelines, LangGraph workflows), RAG and LLM integration "
            "(chatbots and document Q&A grounded in real data), Fullstack AI "
            "products (React frontend with FastAPI or Go backend and an AI feature "
            "built in), and Backend and API development (Go or Node services, "
            "database architecture)."
        ),
    },
    {
        "id": "availability",
        "topic": "availability and how to start a project",
        "content": (
            "I'm available for a limited number of freelance projects alongside my "
            "full-time work. The best way to start is to share a short description "
            "of what you're building — I usually respond within a day. You can use "
            "the contact form, WhatsApp, or just tell me about your project right "
            "here in this chat and I'll take it from there."
        ),
    },
    {
        "id": "contact",
        "topic": "contact information",
        "content": (
            "You can reach me by email at mmasanadurai007@gmail.com, on WhatsApp, "
            "through the contact form on this site, or on LinkedIn and GitHub — "
            "links are in the footer."
        ),
    },
]


def format_knowledge_base() -> str:
    """Render the knowledge base as a flat text block for prompt injection."""
    lines = []
    for entry in KNOWLEDGE_BASE:
        lines.append(f"[{entry['topic']}]\n{entry['content']}")
    return "\n\n".join(lines)
