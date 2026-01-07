import React, { useState, useEffect } from 'react';

function Editor({ note, saveNote,deleteNote}) {
  // Local state for typing, makes sure text is editable
  const [content, setText] = useState(note.content);
  const [title, setTitle] = useState(note.title);

  // Update local state if note changes (different note)
  useEffect(() => {
    setText(note.content);
    setTitle(note.title);
  }, [note]);

  const handleSave = () => {
    saveNote({ ...note, title,content });
  };

    const handleDelete = () => {
    deleteNote(note.id);
  };

  return (
    <div className="editor">
      <input
        className="title-input"
        placeholder="Untitled"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        className="text-input"
        placeholder="Start writing..."
        value={content}
        onChange={e => setText(e.target.value)}
      />
        <br></br>
      <div className="button-container">
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDelete}>Delete</button>
      </div>

    </div>
  );
}

export default Editor;
