import axios from 'axios';
import { GET_NOTIFICATIONS, RESET_NOTIFICATIONS, SET_NOTIFICATIONS_LOADING } from '../../types';

export const getNotifications = (params) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_NOTIFICATIONS_LOADING })
      const response = await axios.get('/notification', {
        params
      })
      const { data } = response;

      dispatch({
        type: GET_NOTIFICATIONS,
        payload: data
      })

    } catch (error) {
      console.log(error);
    }
  }
}


export const resetNotifications = () => ({
  type: RESET_NOTIFICATIONS
})
