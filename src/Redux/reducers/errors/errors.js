import { DISPLAY_ERROR } from "../../types";
import { CLEAN_ERROR } from '../../types';

const initState = {
  errors: {},
}

export function errorsReducer(state, action) {
  if (!state) {
    state = initState
  }

  switch (action.type) {
    case DISPLAY_ERROR: return {
      ...state,
      errors: {
        [action.payload.error]: action.payload.errorText,
      }
    }
    case CLEAN_ERROR: return {
      ...state,
      errors: {},
    }
    default: return state;
  }
}
