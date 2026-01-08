import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import EditorWrapper from "./components/EditorWrapper";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import RequireAuth from "./auth/RequireAuth";
import "./App.css";
import { useRef } from "react";

import { useAuth } from "./auth/AuthProvider";
import { listNotes, createNote as apiCreate, updateNote as apiUpdate, deleteNote as apiDelete } from "./api";

function App() {
  const navigate = useNavigate();
  const { user, idToken } = useAuth();

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!user || !idToken) {
      setNotes([]);
      return;
    }

    (async () => {
      try {
        const data = await listNotes(idToken);
        setNotes(data);
      } catch (e) {
        console.error("Error fetching notes:", e);
      }
    })();
  }, [user, idToken]);


  const createNote = async () => {
    try {
      const data = await apiCreate(idToken);
      setNotes([data, ...notes]);
      navigate(`/app/note/${data.id}`);
    } catch (e) {
      console.error("Error creating note:", e);
    }
  };


  const saveNote = async (updatedNote) => {
    try {
      const data = await apiUpdate(idToken, updatedNote.id, {
        title: updatedNote.title,
        content: updatedNote.content,
      });
      setNotes([data, ...notes.filter((n) => n.id !== updatedNote.id)]);
      navigate("/app/home");
    } catch (e) {
      console.error("Error saving note:", e);
    }
  };


  const deleteNote = async (id) => {
    try {
      await apiDelete(idToken, id);
      setNotes(notes.filter((n) => n.id !== id));
      navigate("/app/home");
    } catch (e) {
      console.error("Error deleting note:", e);
    }
  };


  return (
    <div className="layout">
      {user && <Sidebar notes={notes} createNote={createNote} />}

      <main className="content" style={{ marginLeft: user ? 120 : 0 }}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected */}
          <Route element={<RequireAuth />}>
            <Route path="/app/home" element={<HomePage notes={notes} />} />
            <Route
              path="/app/note/:id"
              element={<EditorWrapper notes={notes} saveNote={saveNote} deleteNote={deleteNote} />}
            />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
