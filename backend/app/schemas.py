#schemas.py
from pydantic import BaseModel, EmailStr

# ---------- Auth ----------
class RegisterIn(BaseModel):
    email: EmailStr
    password: str

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserOut(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True

# ---------- Notes ----------
class NoteCreate(BaseModel):
    title: str = ""
    content: str = ""

class NoteUpdate(BaseModel):
    title: str | None = None
    content: str | None = None

class NoteOut(BaseModel):
    id: int
    title: str
    content: str

    class Config:
        from_attributes = True
