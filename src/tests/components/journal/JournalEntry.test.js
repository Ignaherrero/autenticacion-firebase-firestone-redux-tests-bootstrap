import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router-dom";
import { JournalEntry } from "../../../components/journal/JournalEntry";
import { activeNotes } from "../../../actions/notes";

jest.mock("../../../actions/notes", () => ({
  activeNotes: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
  id: "123",
  title: "algo",
  body: "algo mas",
  url: "www.google.com",
  img: "http://www.imagenes.com/",
  date: new Date(),
};

const wrapper = mount(
  <MemoryRouter>
    <Provider store={store}>
      <JournalEntry {...note} />
    </Provider>
  </MemoryRouter>
);
describe("Pruebas en <JorunalEntry/>", () => {
  test("debe renderizar el componente correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe disparar la acción activeNotes", () => {
    wrapper.find(".journal__entry").prop("onClick")();
    expect(activeNotes).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(activeNotes(note.id, note));
  });
});
