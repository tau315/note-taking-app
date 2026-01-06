import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import EditorWrapper from './components/EditorWrapper';
import EmptyState from './components/EmptyState';
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
  const createNote = () => {
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
    navigate('/');
  };

    return (
    <div className="layout">
      <Sidebar notes={notes}
  createNote={createNote}></Sidebar>

      <main className="content">
        <Routes>
          <Route path="/" element={<EmptyState />} />
          <Route
            path="/note/:id"
            element={<EditorWrapper notes={notes} saveNote={saveNote} deleteNote={deleteNote}/>}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
