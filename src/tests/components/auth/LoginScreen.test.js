import { mount } from "enzyme";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router-dom";
import {
  startGoogleLogin,
  startLoginEmailPassword,
} from "../../../actions/auth";

jest.mock("../../../actions/auth", () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    isLoading: false,
    msgError: null,
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <MemoryRouter>
    <Provider store={store}>
      <LoginScreen />
    </Provider>
  </MemoryRouter>
);

describe("Pruebas en <LoginScreen/>", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("Debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe disparar la accion startGoogleLogin", () => {
    wrapper.find(".google-btn").prop("onClick")();
    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test("Debe disparar startLoginEmailPassword con sus argumentos", () => {
    wrapper.find("form").prop("onSubmit")({ preventDefault() {} });
    expect(startLoginEmailPassword).toHaveBeenCalledWith(
      "nachoprueba@hotmail.com",
      "123456"
    );
  });
});
