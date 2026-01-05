import React, { useState, useEffect } from 'react';

function Editor({ note, saveNote, cancelEditing }) {
  // Local state for typing, makes sure text is editable
  const [text, setText] = useState(note.text);

  // Update local state if note changes (different note)
  useEffect(() => {
    setText(note.text);
  }, [note]);

  const handleSave = () => {
    saveNote({ ...note, text });
  };

  return (
    <div className="editor-container">
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
