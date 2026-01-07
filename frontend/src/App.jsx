import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import EditorWrapper from './components/EditorWrapper';
import EmptyState from './components/EmptyState';
import './App.css';

function App() {
  const navigate = useNavigate();

  const API_URL = 'http://localhost:8000/api/notes';
  const [notes, setNotes] = useState([]);

   // Load notes from backend on mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.error('Error fetching notes:', err);
      }
    };
    fetchNotes();
  }, []);

    // Create a new note
  const createNote = async () => {
    const newNote = { id: Date.now(), title: '', content: '' }; // id for now in frontend
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote),
      });
      const data = await res.json();
      setNotes([data, ...notes]);
      navigate(`/note/${data.id}`);
    } catch (err) {
      console.error('Error creating note:', err);
    }
  };
  // Save/update a note
const saveNote = async (updatedNote) => {
  try {
    const res = await fetch(`${API_URL}/${updatedNote.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedNote), // must have content field
    });
    const data = await res.json();
    setNotes([data, ...notes.filter(n => n.id !== updatedNote.id)]);
    navigate('/');
  } catch (err) {
    console.error('Error saving note:', err);
  }
};


    // Delete a note
  const deleteNote = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setNotes(notes.filter(note => note.id !== id));
      navigate('/');
    } catch (err) {
      console.error('Error deleting note:', err);
    }
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