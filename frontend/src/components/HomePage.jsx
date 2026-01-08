import { NavLink } from "react-router-dom";

function HomePage({ notes }) {
  return (
    <div className="home">
      <h2>Welcome to the home page!</h2>

      <h3>Notes List</h3>
      <div className="note-list">
        {notes.length === 0 ? (
          <p>No notes yet</p>
        ) : (
          notes.map(note => (
            <NavLink
              key={note.id}
              to={`/note/${note.id}`}
              className={({ isActive }) =>
                `nav ${isActive ? "active" : ""}`
              }
            >
              {note.title || "Untitled Note"}
            </NavLink>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
