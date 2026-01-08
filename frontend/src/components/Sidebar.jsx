import { NavLink, useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Sidebar({ notes, createNote }) {
  const navigate = useNavigate();

  const navHome = () => navigate("/app/home");

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <button className="new-btn" onClick={createNote}>+ New Note</button>
      <button className="home-btn" onClick={navHome}>Home</button>
      <button onClick={logout} style={{ width: "100%", marginTop: 10 }}>Logout</button>

      <h3>Notes List</h3>
      <div className="note-list">
        {notes.map((note) => (
          <NavLink
            key={note.id}
            to={`/app/note/${note.id}`}
            className={({ isActive }) => `nav ${isActive ? "active" : ""}`}
          >
            {note.title || "Untitled Note"}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
