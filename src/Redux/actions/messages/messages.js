import axios from 'axios';
import { SET_MESSAGES_LOADING, GET_MESSAGES, RESET_MESSAGES, CLEAR_MESSAGES_LOADING } from '../../types';

export const addMessages = (filter, params) => {
  return async (_dispatch) => {
    try {
      await axios.post('/messages', params, {
        params: {
          roomId: filter.roomId
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const resetMessages = () => ({
  type: RESET_MESSAGES
})

export const getMessages = (roomId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_MESSAGES_LOADING });
      const response = await axios.get(`/messages/${roomId}`);
      const { data } = response;
      dispatch({ type: GET_MESSAGES, payload: data });
    } catch (error) {
      dispatch({ type: CLEAR_MESSAGES_LOADING });
      console.log(error);
    }
  }
}
