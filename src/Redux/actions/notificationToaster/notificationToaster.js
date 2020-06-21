import { DISPLAY_NOTIFICATION, CLEAR_NOTIFICATION } from "../../types";
import notificationsConfig from '../../../config/notifications.json';

export const displayNotification = (notificationText, notificationType) => {
  return async (dispatch) => {
    dispatch({
      type: DISPLAY_NOTIFICATION,
      payload: {
        notificationText,
        notificationType
      }
    })

    setTimeout(() => {
      dispatch({ type: CLEAR_NOTIFICATION })
    }, notificationsConfig.CLEAR_NOTIFICATION_TIMEOUT)
  }
} 
