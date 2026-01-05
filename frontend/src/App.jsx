import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NoteList from './components/NoteList.jsx';
import EditorWrapper from './components/EditorWrapper.jsx';
import './App.css';

function App() {
  const navigate = useNavigate();

  // load notes from localStorage or start empty
  // keep track of all notes
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  // save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // create new note and open a new editor page 
  // blank note with unique ID and URL
  const createNewNote = () => {
    const newNote = { id: Date.now(), title: '', text: '' };
    setNotes([newNote, ...notes]);
    navigate(`/note/${newNote.id}`);
  };

  // save note (new or edited)
  const saveNote = (updatedNote) => {
    setNotes([updatedNote, ...notes.filter(n => n.id !== updatedNote.id)]);
    navigate('/'); // back to home
  };

  // delete a note
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="app-container">
      <h1>Note Taking App</h1>

      <Routes>
        {/* Home page */}
        <Route
          path="/"
          element={
            <>
              <button className="new-note-btn" onClick={createNewNote}>
                New Note
              </button>
              <h2>Note List</h2>
              <NoteList notes={notes} deleteNote={deleteNote} />
            </>
          }
        />

        {/* Editor page */}
        <Route
          path="/note/:id"
          element={<EditorWrapper notes={notes} saveNote={saveNote} />}
        />
      </Routes>
    </div>
  );
}

export default App;
