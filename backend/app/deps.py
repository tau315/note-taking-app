#deps.py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.models import User
from app.firebase import verify_firebase_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")  # just for docs UI

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    try:
        decoded = verify_firebase_token(token)
        email = decoded.get("email")
        if not email:
            raise ValueError("No email in token")
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Firebase token",
        )

    # Map Firebase user -> your Postgres User row (create on first login)
    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(email=email, password_hash="")  # not used with Firebase
        db.add(user)
        db.commit()
        db.refresh(user)

    return user
