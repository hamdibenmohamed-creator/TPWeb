import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";
import "../styles/notes.css";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      } else {
        console.error("Failed to fetch notes:", err);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    fetchNotes();
  }, [navigate]);

  const deleteNote = async (id) => {
    await api.delete(`/notes/${id}`);
    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }
    fetchNotes();
  };

  const editNote = (note) => {
    setSelectedNote(note);
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="notes-page">
      <div className="notes-header">
        <h2>My Notes</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <NoteForm
        fetchNotes={fetchNotes}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />

      <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
    </div>
  );
}

export default Notes;
