import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { login } from "../../actions/auth";
import { AppRouter } from "../../routers/AppRouter";
import { act } from "react-dom/test-utils";
import { firebase } from "../../firebase/firebase-config";

jest.mock("../../actions/auth", () => ({
  login: jest.fn(),
}));
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
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
      id: "aws",
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe("Pruebas en <AppRouter/>", () => {
  test("Debe llamar a login si estoy autenticado", async () => {
    let user;
    await act(async () => {
      const userCred = await firebase
        .auth()
        .signInWithEmailAndPassword("testertwo@hotmail.com", "123456");
      user = userCred.user;
      const wrapper = mount(
        <MemoryRouter>
          <Provider store={store}>
            <AppRouter />
          </Provider>
        </MemoryRouter>
      );
    });
    expect(login).toHaveBeenCalled();
    expect(login).toHaveBeenCalledWith("HqTLeNFXd3eCaAXQh0RoXc73JQv2", null);
  });
});
