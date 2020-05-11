import { SET_MESSAGES_LOADING, GET_MESSAGES, RESET_MESSAGES, CLEAR_MESSAGES_LOADING } from "../../types";


const initState = {
  isLoading: false,
  messages: { roomId: '', messages: [] },
}

export function messagesReducer(state, action) {
  if (!state) {
    state = initState
  }

  switch (action.type) {
    case SET_MESSAGES_LOADING: return { ...state, isLoading: true };
    case CLEAR_MESSAGES_LOADING: return { ...state, isLoading: false };
    case GET_MESSAGES: return { ...state, messages: action.payload, isLoading: false };
    case RESET_MESSAGES: return {
      ...state,
      messages: {
        ...state.messages,
        messages: []
      }
    }
    default: return state;
  }
}
