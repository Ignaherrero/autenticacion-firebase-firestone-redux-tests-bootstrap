import types from "../types/types";

const initialState = {
  isLoading: false,
  msgError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.uiSelector:
      return { msgError: action.payload, isLoading: true };
    case types.uiRemoveError:
      return { ...state, msError: action.payload };
    case types.uiStartLoading:
      return { ...state, isLoading: true };
    case types.uiFinishLoading:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
