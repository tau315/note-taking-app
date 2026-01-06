import { useParams} from 'react-router-dom';
import Editor from './Editor.jsx';

function EditorWrapper({ notes, saveNote, deleteNote }) {
  const { id } = useParams(); //gets note ID from URL
  //const navigate = useNavigate(); //allows for nav back to home page
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
    navigate('/');
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
