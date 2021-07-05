import types from "../types/types";

export const authReducer = (state = [], { type, payload }) => {
  switch (type) {
    case types.login:
      return { ...state, ...payload };
    case types.logout:
      return {};
    default:
      return state;
  }
};
