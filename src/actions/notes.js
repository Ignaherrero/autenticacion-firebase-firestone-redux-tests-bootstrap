import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import types from "../types/types";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);
    dispatch(activeNotes(docRef.id, newNote));
    dispatch(addNewNote(docRef.id, newNote));
  };
};

export const activeNotes = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (note) => ({
  type: types.notesLoad,
  payload: note,
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;
      if (!note.url) delete note.url;
      if (!note.img) delete note.img;

      const noteToFirestone = { ...note };
      delete noteToFirestone.id;

      await db.doc(`/${uid}/journal/notes/${note.id}`).update(noteToFirestone);
      dispatch(refreshNote(note.id, note));
      Swal.fire("Save", note.title, "success");
    } catch (error) {
      console.log(error);
    }
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdate,
  payload: { id, note },
});

export const startUploadingImage = (file) => {
  return async (dispatch, getState) => {
    Swal.fire({
      title: "Uploading...",
      text: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const { active: activeNote } = getState().notes;

    const fileUrl = await fileUpload(file);
    Swal.close();
    dispatch(startSaveNote({ ...activeNote, url: fileUrl }));
    dispatch(activeNotes(activeNote.id, { ...activeNote, url: fileUrl }));
  };
};

export const startDeleteNote = (id) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;
      await db.doc(`/${uid}/journal/notes/${id}`).delete();
      dispatch(deleteNote(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
  payload: { notes: [], active: null, date: null, body: "" },
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: { id, ...note },
});
