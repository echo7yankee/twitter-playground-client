import { SET_ERRORS_LOGIN, SET_AUTHENTICATED, SET_AUTH_LOADING, SET_UNAUTHENTICATED, UNSET_ERRORS, SET_ERRORS_REGISTER } from "../../types";

const initState = {
  authenticated: false,
  isLoading: false,
  errorsLogin: {},
  errorsRegister: {}
}

export function authReducer(state, action) {
  if (!state) {
    state = initState;
  }

  switch (action.type) {
    case SET_AUTH_LOADING: return { ...state, isLoading: true };
    case SET_AUTHENTICATED: return { ...state, authenticated: true, isLoading: false, errors: {} };
    case SET_UNAUTHENTICATED: return { ...state, authenticated: false }
    case SET_ERRORS_LOGIN: return { ...state, errorsLogin: action.payload, isLoading: false };
    case SET_ERRORS_REGISTER: return { ...state, errorsRegister: action.payload, isLoading: false };
    case UNSET_ERRORS: return { ...state, errorsRegister: {}, errorsLogin: {} }
    default: return state;
  }
}
