import { authReducer } from "../../reducers/authReducer";

describe("authReducer", () => {
  test("debe de retornar el estado por defecto", () => {
    const result = authReducer([], { type: null, payload: null });
    expect(result).toEqual([]);
  });

  test("debe retornar un objecto vacio", () => {
    const result = authReducer(
      { uid: "123sdf" },
      { type: "[auth] logout", payload: {} }
    );
    expect(result).toEqual({});
  });

  test("debe retornar un uid", () => {
    const result = authReducer([], {
      type: "[auth] login",
      payload: { uid: "asd123", displayName: "nacho" },
    });
    expect(result).toEqual({ uid: "asd123", displayName: "nacho" });
  });
});
