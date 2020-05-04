import { GET_USER_DETAILS, RESET_USER_DETAILS, SET_USER_DETAILS_LOADING, GET_USERS, SET_GET_USERS_LOADING } from "../../types";

const initState = {
  users: [],
  userDetails: {},
  isLoading: false,
}

export function userReducer(state, action) {
  if (!state) {
    state = initState
  }

  switch (action.type) {
    case SET_USER_DETAILS_LOADING: return { ...state, isLoading: true };
    case GET_USER_DETAILS: return { ...state, userDetails: action.payload, isLoading: false };
    case SET_GET_USERS_LOADING: return { ...state, isLoading: true };
    case GET_USERS: return { ...state, user: action.payload, isLoading: false };
    case RESET_USER_DETAILS: return { ...state, userDetails: {} }
    default: return state;
  }
}
