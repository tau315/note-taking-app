import firebase_admin
from firebase_admin import credentials, auth
from pathlib import Path

from app.config import settings

_initialized = False

def init_firebase():
    global _initialized
    if _initialized:
        return

    cred_path = settings.FIREBASE_CREDENTIALS_PATH  # <-- from Pydantic settings

    p = Path(cred_path)
    if not p.is_absolute():
        base_dir = Path(__file__).resolve().parent.parent  # backend/
        p = (base_dir / p).resolve()

    if not p.exists():
        raise RuntimeError(f"Firebase credentials file not found: {p}")

    firebase_admin.initialize_app(credentials.Certificate(str(p)))
    _initialized = True

def verify_firebase_token(id_token: str) -> dict:
    init_firebase()
    return auth.verify_id_token(id_token)
