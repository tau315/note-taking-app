import { useParams} from 'react-router-dom';
import Editor from './Editor.jsx';

function EditorWrapper({ notes, saveNote, deleteNote }) {
  const { id } = useParams(); //gets note ID from URL
  // Find note by ID
  const note = notes.find(n => n.id === Number(id));

  if (!note) {
    return (
      <div>
        <p>Note not found!</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const handleDelete = (id) => {
    deleteNote(id);
  };

  // Back button handler
  //const cancelEditing = () => navigate('/');

  return (
    <Editor
      note={note}
      saveNote={saveNote}
      deleteNote={handleDelete}
    />
  );

}

export default EditorWrapper;
