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


def run_migrations():
    from alembic.config import Config
    from alembic import command
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")


@app.on_event("startup")
async def startup_event():
    try:
        import asyncio
        loop = asyncio.get_event_loop()
        await loop.run_in_executor(None, run_migrations)
        print("✅ Migrations ran successfully")
    except Exception as e:
        print(f"⚠️ Migration error: {e}")


@app.get("/")
async def root():
    return {
        "message": "Durai Portfolio API is running",
        "docs": "/docs",
        "health": f"{settings.api_v1_prefix}/health",
    }