import types from "../types/types";

const initialState = {
  notes: [],
  active: null,
  date: null,
  body: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.notesAddNew:
      return {
        ...state,
        notes: [...state.notes, payload],
      };
    case types.notesActive:
      return { ...state, active: { id: payload.id, ...payload } };
    case types.notesLoad:
      return { ...state, notes: payload };
    case types.notesUpdate:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === payload.id ? payload.note : note
        ),
      };
    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== payload),
      };
    case types.notesLogoutCleaning:
      return { ...state, ...payload };
    default:
      return state;
  }
};
