import { DISPLAY_NOTIFICATION } from "../../types";
import { CLEAR_NOTIFICATION } from '../../types';

const initState = {
  notificationType: '',
  notificationMessage: '',
}

export function notificationToasterReducer(state, action) {
  if (!state) {
    state = initState
  }

  switch (action.type) {
    case DISPLAY_NOTIFICATION: return {
      ...state,
      notificationType: action.payload.notificationType,
      notificationMessage: action.payload.notificationText,
    }
    case CLEAR_NOTIFICATION: return {
      ...initState,
    }
    default: return state;
  }
}
