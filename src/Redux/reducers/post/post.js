import { SET_POSTS_LOADING, GET_POSTS, RESET_POSTS, GET_POST, RESET_POST } from "../../types";

const initState = {
  isLoading: false,
  posts: [],
  singlePost: {},
}

export function postReducer(state, action) {
  if (!state) {
    state = initState
  }

  switch (action.type) {
    case SET_POSTS_LOADING: return { ...state, isLoading: true };
    case GET_POSTS: return { ...state, isLoading: false, posts: action.payload };
    case GET_POST: return { ...state, singlePost: action.payload };
    case RESET_POSTS: return { ...state, posts: [] };
    case RESET_POST: return { ...state, singlePost: {} };
    default: return state;
  }
}
