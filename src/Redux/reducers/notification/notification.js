import { GET_NOTIFICATIONS, RESET_NOTIFICATIONS } from "../../types";

const initState = {
  isLoading: false,
  notifications: [],
  notificationsLength: null,
}

export function notificationReducer(state, action) {
  if (!state) {
    state = initState
  }

  switch (action.type) {
    case GET_NOTIFICATIONS: return {
      ...state, notifications: action.payload.notifications,
      notificationsLength: action.payload.notificationsLength
    }
    case RESET_NOTIFICATIONS: return { ...state, notifications: [], notificationsLength: null }
    default: return state;
  }
}
