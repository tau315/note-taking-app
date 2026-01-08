from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str
    FRONTEND_ORIGIN: str = "http://localhost:5173"

    # Firebase Admin (backend token verification)
    FIREBASE_CREDENTIALS_PATH: str

    # Keep these if you still have old JWT code around (optional)
    JWT_SECRET: str | None = None
    JWT_ALG: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",  # important: don't crash on extra env vars
    )

settings = Settings()
