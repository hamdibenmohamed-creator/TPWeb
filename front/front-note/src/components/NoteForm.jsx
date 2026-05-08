import { useState, useEffect } from "react";
import api from "../api/api";

function NoteForm({ fetchNotes, selectedNote, setSelectedNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("Basse");
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setPriority(selectedNote.priority);
    }
  }, [selectedNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (selectedNote) {
        await api.put(`/notes/${selectedNote.id}`, {
          title,
          content,
          priority,
        });
      } else {
        await api.post("/notes", {
          title,
          content,
          priority,
        });
      }

      setTitle("");
      setContent("");
      setPriority("Basse");
      setSelectedNote(null);

      fetchNotes();
    } catch (err) {
      console.error("Note save failed:", err.response || err);
      if (err.response?.status === 422 && err.response.data?.errors) {
        const errors = err.response.data.errors;
        const firstError = Object.values(errors)[0][0];
        setError(firstError);
      } else {
        setError(
          err.response?.data?.message ||
            "Unable to save note. Please check your input and try again.",
        );
      }
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Basse">Basse</option>
        <option value="Moyenne">Moyenne</option>
        <option value="Haute">Haute</option>
      </select>

      <button type="submit">{selectedNote ? "Update Note" : "Add Note"}</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default NoteForm;
