import { GET_NOTIFICATIONS, RESET_NOTIFICATIONS, SET_NOTIFICATIONS_LOADING } from "../../types";

const initState = {
  isLoading: false,
  notifications: [],
  notificationsLength: 0,
}

export function notificationReducer(state, action) {
  if (!state) {
    state = initState
  }

  switch (action.type) {
    case SET_NOTIFICATIONS_LOADING: return { ...state, isLoading: true }
    case GET_NOTIFICATIONS: return {
      ...state, notifications: action.payload.notifications,
      notificationsLength: action.payload.notificationsLength,
      isLoading: false,
    }
    case RESET_NOTIFICATIONS: return { ...state, notifications: [], notificationsLength: 0 }
    default: return state;
  }
}
