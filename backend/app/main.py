from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routes import chat_routes, lead_routes, health_routes

app = FastAPI(
    title=settings.app_name,
    description="Backend API for Masana Durai's freelance portfolio — "
    "powers the Durai LangGraph chat agent and contact/lead capture.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_routes.router, prefix=settings.api_v1_prefix)
app.include_router(chat_routes.router, prefix=settings.api_v1_prefix)
app.include_router(lead_routes.router, prefix=settings.api_v1_prefix)


@app.get("/")
async def root():
    return {
        "message": "Durai Portfolio API is running",
        "docs": "/docs",
        "health": f"{settings.api_v1_prefix}/health",
    }
