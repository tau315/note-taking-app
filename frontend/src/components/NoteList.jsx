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
          <p onClick={() => navigate(`/note/${note.id}`)}> 
            {/*can change this part later to display a note title?*/}
            {note.text ? note.text.substring(0, 30) + "..." : "Untitled Note"}
          </p>
          {/*individual delete button -- change this design later */}
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
