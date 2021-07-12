import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router-dom";
import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import types from "../../../types/types";

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
    date: null,
    body: "",
  },
};

let store = mockStore(initState);

const wrapper = mount(
  <MemoryRouter>
    <Provider store={store}>
      <RegisterScreen />
    </Provider>
  </MemoryRouter>
);

describe("Pruebas en <RegisterScreen/>", () => {
  test("Debe imprimir el componente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe hacer el dispatch de la accion que corresponda", () => {
    const emailField = wrapper.find('input[name="email"]');
    emailField.simulate("change", {
      target: {
        value: "",
        name: "email",
      },
    });
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.uiSelector,
      payload: "Email is not valid",
    });
  });

  test("Debe mostrar el cartel de alerta", () => {
    const initState = {
      auth: {},
      ui: {
        isLoading: false,
        msgError: "The email address is already in use by another account.",
      },
      notes: {
        notes: [],
        active: null,
        date: null,
        body: "",
      },
    };

    let store = mockStore(initState);

    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <RegisterScreen />
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper.find(".auth__alert-error").exists()).toBe(true);
    expect(wrapper.find(".auth__alert-error").text().trim()).toBe(
      initState.ui.msgError
    );
  });
});
