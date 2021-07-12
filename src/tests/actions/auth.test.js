import {
  login,
  startLoginEmailPassword,
  startLogout,
} from "../../actions/auth";
import types from "../../types/types";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: { uid: "TESTER" },
  notes: {
    active: {
      id: "1uBzAa42BGH69laUvJrV",
    },
  },
};

let store = mockStore(initState);

describe("Auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("Debe crear la acción para login", () => {
    const result = login("asdfwer123", "Ramon");
    expect(result).toEqual({
      type: types.login,
      payload: { uid: "asdfwer123", uname: "Ramon" },
    });
  });

  test("Debe crear la acción para logout", async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: types.logout });
    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning,
      payload: {
        notes: [],
        active: null,
        date: null,
        body: "",
      },
    });
  });

  test("Debe iniciar el startLoginEmailPassword", async () => {
    await store.dispatch(
      startLoginEmailPassword("testertwo@hotmail.com", "123456")
    );
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: types.uiStartLoading });
    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: "HqTLeNFXd3eCaAXQh0RoXc73JQv2",
        uname: null,
      },
    });
    expect(actions[2]).toEqual({ type: types.uiFinishLoading });
  });
});
