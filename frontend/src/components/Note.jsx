import React from 'react';

function Note({ note, deleteNote, setEditingNote }) {
  return (
    <div className="note">
      <p onClick={() => setEditingNote(note)}>{note.text || "Untitled Note"}</p>
      <button onClick={() => deleteNote(note.id)}>Delete</button>
    </div>
  );
}

export default Note;
