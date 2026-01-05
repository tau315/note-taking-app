import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from './Editor.jsx';

function EditorWrapper({ notes, saveNote }) {
  const { id } = useParams(); //gets note ID from URL
  const navigate = useNavigate(); //allows for nav back to home page

  // Find note by ID
  const note = notes.find(n => n.id === parseInt(id));

  if (!note) {
    return (
      <div>
        <p>Note not found!</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  // Back button handler
  const cancelEditing = () => navigate('/');

  return <Editor note={note} saveNote={saveNote} cancelEditing={cancelEditing} />;
}

export default EditorWrapper;
