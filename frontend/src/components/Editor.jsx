import React, { useState, useEffect } from 'react';

function Editor({ note, saveNote, cancelEditing }) {
  // Local state for typing, makes sure text is editable
  const [text, setText] = useState(note.text);
  const [title, setTitle] = useState(note.title);

  // Update local state if note changes (different note)
  useEffect(() => {
    setText(note.text);
    setTitle(note.title);
  }, [note]);

  const handleSave = () => {
    saveNote({ ...note, title,text });
  };

  return (
    <div className="editor-container">
        <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        className="title-input"
        />
      <textarea
        value={text}                  // controlled input
        onChange={(e) => setText(e.target.value)} //updates text as user types
        placeholder="Type your note here..."
      />
      <div className="editor-buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={cancelEditing} className="cancel-btn">Back</button>
      </div>
    </div>
  );
}

export default Editor;
