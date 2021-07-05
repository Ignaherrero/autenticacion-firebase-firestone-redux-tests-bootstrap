import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNotes, startDeleteNote } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const [values, handleInputChange, reset] = useForm(note);
  const { title, body } = values;
  const dispatch = useDispatch();
  let activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNotes(values.id, values));
  }, [dispatch, values]);

  const handleDeleteNote = (id) => {
    dispatch(startDeleteNote(id));
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          name="title"
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          name="body"
          value={body}
          onChange={handleInputChange}
        >
          {title}
        </textarea>

        <div className="notes__image">
          <img src={note.url} alt="imagen" />
        </div>
        <button
          className="btn btn-dangerous"
          onClick={() => handleDeleteNote(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
