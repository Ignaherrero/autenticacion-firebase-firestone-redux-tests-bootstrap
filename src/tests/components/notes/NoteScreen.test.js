import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router-dom";
import { NoteScreen } from "../../../components/notes/NoteScreen";
import { activeNotes } from "../../../actions/notes";

jest.mock("../../../actions/notes", () => ({
  activeNotes: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    isLoading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: 1233,
      title: "hola mundo",
      body: "hoy esta soleado",
    },
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <MemoryRouter>
    <Provider store={store}>
      <NoteScreen />
    </Provider>
  </MemoryRouter>
);

describe("Pruebas en <NoteScreen/>", () => {
  test("debe renderizar el componente correctamente", () => {});
  test("debe disparar el activeNote", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "hola mundoooo",
      },
    });
    expect(activeNotes).toHaveBeenCalled();
    expect(activeNotes).toHaveBeenLastCalledWith(1233, {
      id: 1233,
      title: "hola mundoooo",
      body: "hoy esta soleado",
    });
  });
});
