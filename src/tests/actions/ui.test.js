import {
  finishLogin,
  removeError,
  setError,
  startLogin,
} from "../../actions/ui";
import types from "../../types/types";

describe("ui", () => {
  test("setError debe retornar un error recibido por parametro", () => {
    const action = setError("algo salio mal");
    expect(action).toEqual({
      type: types.uiSelector,
      payload: "algo salio mal",
    });
  });

  test("removeError debe retornar uiRemoveError", () => {
    const action = removeError();
    expect(action).toEqual({ type: types.uiRemoveError });
  });

  test("startLogin debe retornar uiStartLoading", () => {
    const action = startLogin();
    expect(action).toEqual({ type: types.uiStartLoading });
  });

  test("finishLogin debe retornar uiFinishLoading", () => {
    const action = finishLogin();
    expect(action).toEqual({ type: types.uiFinishLoading });
  });
});
