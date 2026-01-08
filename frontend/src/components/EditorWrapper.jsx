import { useParams, useNavigate } from "react-router-dom";
import Editor from "./Editor.jsx";

function EditorWrapper({ notes, saveNote, deleteNote }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const note = notes.find((n) => n.id === Number(id));

  if (!note) {
    return (
      <div>
        <p>Note not found!</p>
        <button onClick={() => navigate("/app/home")}>Back to Home</button>
      </div>
    );
  }

  return <Editor note={note} saveNote={saveNote} deleteNote={deleteNote} />;
}

export default EditorWrapper;
