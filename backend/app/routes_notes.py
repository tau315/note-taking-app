from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.deps import get_db, get_current_user
from app.models import Note, User
from app.schemas import NoteCreate, NoteUpdate, NoteOut

router = APIRouter(prefix="/notes", tags=["notes"])

@router.get("", response_model=list[NoteOut])
def list_notes(
    q: str | None = None,
    limit: int = 50,
    offset: int = 0,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    query = db.query(Note).filter(Note.user_id == user.id)
    if q:
        query = query.filter(or_(Note.title.ilike(f"%{q}%"), Note.content.ilike(f"%{q}%")))
    return query.order_by(Note.updated_at.desc()).limit(limit).offset(offset).all()

@router.post("", response_model=NoteOut)
def create_note(
    data: NoteCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    note = Note(user_id=user.id, title=data.title, content=data.content)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note

@router.put("/{note_id}", response_model=NoteOut)
def update_note(
    note_id: int,
    data: NoteUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    note = db.query(Note).filter(Note.id == note_id, Note.user_id == user.id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    if data.title is not None:
        note.title = data.title
    if data.content is not None:
        note.content = data.content

    db.commit()
    db.refresh(note)
    return note

@router.delete("/{note_id}")
def delete_note(
    note_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    note = db.query(Note).filter(Note.id == note_id, Note.user_id == user.id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    db.delete(note)
    db.commit()
    return {"ok": True}
