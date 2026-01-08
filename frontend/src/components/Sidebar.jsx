
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Sidebar({ notes, createNote }) {
  
  const navigate = useNavigate()
  const navHome = () => {
    navigate('/home'); // Navigate to home page
  }

  return (
    <aside className="sidebar">
    {/*make a new note button works*/}
      <button className="new-btn" onClick={createNote}>
        + New Note
      </button>

    {/*home button*/}
      <button className="home-btn" onClick={navHome}>
        Home
      </button>

    <h3>Notes List</h3>
        <div className="note-list">
        {/*Notes List navigation using NavLink */}
        {notes.map(note => (
          <NavLink
            key={note.id}
            to={`/note/${note.id}`}
            className={({ isActive }) =>
              `nav ${isActive ? 'active' : ''}`
            }
          >
            {note.title || 'Untitled Note'}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
