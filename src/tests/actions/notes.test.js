import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUploadingImage,
} from "../../actions/notes";
import types from "../../types/types";
import { db } from "../../firebase/firebase-config";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

global.scrollTo = jest.fn();

jest.mock("../../helpers/fileUpload", () => ({
  fileUpload: jest.fn(() => {
    return "https://www.pruebaa.com/imagen.jpg";
  }),
}));

const initState = {
  auth: { uid: "TESTER" },
  notes: {
    active: {
      id: "1uBzAa42BGH69laUvJrV",
    },
  },
};

let store = mockStore(initState);

describe("notes", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("debe crear una nueva nota startNewNote", async () => {
    await store.dispatch(startNewNote());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        date: expect.any(Number),
        body: expect.any(String),
        title: expect.any(String),
      },
    });
    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        date: expect.any(Number),
        body: expect.any(String),
        title: expect.any(String),
      },
    });
    await db.doc(`/TESTER/journal/notes/${actions[0].payload.id}`).delete();
  });

  test("Debe cargar las notas", async () => {
    await store.dispatch(startLoadingNotes("TESTER"));
    const action = store.getActions();
    expect(action[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });
  });

  test("Debe actualizar las notas ", async () => {
    const note = {
      id: "1uBzAa42BGH69laUvJrV",
      title: "z",
    };
    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();
    const docRef = await db
      .doc(`/TESTER/journal/notes/${actions[0].payload.id}`)
      .get();
    expect(docRef.data().title).toBe(note.title);
  });

  test("startUploadingImage debe actualizar la url en note", async () => {
    const file = new File([], "foto.jpg");
    await store.dispatch(startUploadingImage(file));
    const actions = store.getActions();
    const docRef = await db
      .doc(`/TESTER/journal/notes/${actions[0].payload.id}`)
      .get();
    expect(typeof docRef.data().url).toBe("string");
  });
});
