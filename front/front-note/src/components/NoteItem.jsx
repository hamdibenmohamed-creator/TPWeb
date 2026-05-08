import { useState } from "react";

function NoteItem({ note, onDelete, onEdit }) {
  const [confirming, setConfirming] = useState(false);

  const getColor = () => {
    const p = note.priority.toLowerCase();
    if (p === "basse") return "low";
    if (p === "moyenne") return "medium";
    return "high";
  };

  return (
    <>
      <div className="note-card">
        <h3>{note.title}</h3>
        <p>{note.content}</p>

        <span className={`badge ${getColor()}`}>{note.priority}</span>

        <p>Created: {new Date(note.created_at).toLocaleDateString()}</p>
        <p>Updated: {new Date(note.updated_at).toLocaleDateString()}</p>

        <button onClick={() => onEdit(note)}>Edit</button>
        <button className="danger" onClick={() => setConfirming(true)}>
          Delete
        </button>
      </div>

      {confirming && (
        <div className="modal-backdrop">
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h4>Delete note</h4>
            <p>Are you sure you want to delete this note?</p>
            <div className="confirm-actions">
              <button className="danger" onClick={() => onDelete(note.id)}>
                Confirm
              </button>
              <button onClick={() => setConfirming(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NoteItem;
