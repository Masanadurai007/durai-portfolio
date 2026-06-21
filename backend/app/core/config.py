from functools import lru_cache
from typing import List

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Central application configuration, loaded from environment variables / .env"""

    # Database
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/durai_portfolio"
    database_url_sync: str = "postgresql+psycopg2://postgres:postgres@localhost:5432/durai_portfolio"

    # AI / chatbot
    groq_api_key: str = ""
    groq_model: str = "llama-3.3-70b-versatile"

    # Email
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    notify_email: str = "mmasanadurai007@gmail.com"

    # CORS
    allowed_origins: str = "http://localhost:3000,http://localhost:5173"

    # WhatsApp
    whatsapp_number: str = "919361977522"

    # App
    app_name: str = "Durai Portfolio API"
    api_v1_prefix: str = "/api/v1"

    @property
    def origins_list(self) -> List[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]

    class Config:
        env_file = ".env"
        extra = "ignore"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
