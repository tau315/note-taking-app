
import { NavLink } from 'react-router-dom';

function Sidebar({ notes, createNote }) {
  //const navigate = useNavigate();

  return (
    <aside className="sidebar">
    {/*make a new note button works*/}
      <button className="new-btn" onClick={createNote}>
        + New Note
      </button>

    <h3>Notes List</h3>
          <div className="note-list">
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
