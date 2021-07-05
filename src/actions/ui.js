import types from "../types/types";

export const setError = (error) => ({
  type: types.uiSelector,
  payload: error,
});

export const removeError = () => ({
  type: types.uiRemoveError,
});

export const startLogin = () => ({
  type: types.uiStartLoading,
});

export const finishLogin = () => ({
  type: types.uiFinishLoading,
});
