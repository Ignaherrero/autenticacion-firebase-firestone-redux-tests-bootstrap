import types from "../../types/types";

describe("types", () => {
  test("debe tener estos types", () => {
    const listTypes = {
      login: "[auth] login",
      logout: "[auth] logout",
      uiSelector: "[ui] Selector",
      uiRemoveError: "[ui] Removerror",
      uiStartLoading: "[ui] StartLoading",
      uiFinishLoading: "[ui] FinishLoading",
      notesAddNew: "[Notes] New note",
      notesActive: "[Notes] Set active note",
      notesLoad: "[Notes] Load notes",
      notesUpdate: "[Notes] Update note",
      notesFileUrl: "[Notes] Update image url",
      notesDelete: "[Notes] Delete note",
      notesLogoutCleaning: "[Notes] Logout cleaning",
    };
    expect(listTypes).toEqual(types);
  });
});
