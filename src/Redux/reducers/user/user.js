import { GET_USER_DETAILS } from "../../types";

const initState = {
  userDetails: {}
}

export function userReducer(state, action) {
  if (!state) {
    state = initState
  }

  switch (action.type) {
    case GET_USER_DETAILS: return { ...state, userDetails: action.payload };
    default: return state;
  }
}
