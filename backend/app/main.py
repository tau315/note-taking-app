from fastapi import FastAPI, HTTPException
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.db import engine
from app.models import Base
from app.routes_auth import router as auth_router
from app.routes_notes import router as notes_router
from pydantic import BaseModel
from typing import List


@asynccontextmanager
async def lifespan(app: FastAPI):
    # --- startup code ---
    Base.metadata.create_all(bind=engine)
    yield
    # --- shutdown code (optional) ---
    # e.g. close connections if you had any


app = FastAPI(
    title="Notes API",
    lifespan=lifespan,
)

# Allow frontend requests from React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"ok": True}

@app.get("/db-check")
def db_check():
    with engine.connect() as conn:
        val = conn.execute(text("SELECT 1")).scalar_one()
    return {"db_ok": True, "value": val}

# Pydantic model for note
class Note(BaseModel):
    id: int
    title: str
    content: str

# In-memory storage for notes
notes: List[Note] = []

# ----------------------
# Endpoints
# ----------------------

# GET all notes
@app.get("/api/notes", response_model=List[Note])
def get_notes():
    return notes

# POST a new note
@app.post("/api/notes", response_model=Note, status_code=201)
def add_note(note: Note):
    notes.append(note)
    return note

# PUT (update) an existing note
@app.put("/api/notes/{note_id}", response_model=Note)
def update_note(note_id: int, updated_note: Note):
    for i, note in enumerate(notes):
        if note.id == note_id:
            notes[i] = updated_note
            return updated_note
    raise HTTPException(status_code=404, detail="Note not found")

# DELETE a note
@app.delete("/api/notes/{note_id}", status_code=204)
def delete_note(note_id: int):
    global notes
    notes = [note for note in notes if note.id != note_id]
    return

app.include_router(auth_router)
app.include_router(notes_router)