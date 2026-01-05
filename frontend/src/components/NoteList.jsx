import React from 'react';
import { useNavigate } from 'react-router-dom';

//displays list of notes
function NoteList({ notes, deleteNote }) {
  const navigate = useNavigate();

  if (notes.length === 0) return <p>No notes yet.</p>; //if user has no notes

  return (
    <div className="note-list">
      {notes.map(note => (
        <div key={note.id} className="note">
          {/*navigate to the note subpage*/}
          <br></br>
          <button onClick={() => navigate(`/note/${note.id}`)}>{note.title||"Untitled Note"}</button>
          {/*individual delete button -- change this design later */}
          <button onClick={() => deleteNote(note.id)}>Delete</button>
          <br></br>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
