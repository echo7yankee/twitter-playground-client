import axios from 'axios';
import { GET_NOTIFICATIONS, RESET_NOTIFICATIONS } from '../../types';

export const getNotifications = (params) => {
  return async (dispatch) => {
    try {
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
