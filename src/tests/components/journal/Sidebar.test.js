import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Sidebar } from "../../../components/journal/Sidebar";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";

jest.mock("../../../actions/auth", () => ({
  startLogout: jest.fn(),
}));

jest.mock("../../../actions/notes", () => ({
  startNewNote: jest.fn(),
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
    notes: [],
    active: null,
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <Sidebar />
  </Provider>
);

store.dispatch = jest.fn();

describe("Pruebas en <Sidebar/>", () => {
  test("debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe llamar el logOut", () => {
    wrapper.find(".btn").prop("onClick")();
    expect(startLogout).toHaveBeenCalled();
  });

  test("debe llamar el startNewNote", () => {
    wrapper.find(".journal__new-entry").prop("onClick")();
    expect(startNewNote).toHaveBeenCalled();
  });
});
