//axios
import axios from 'axios';
import { GET_USER_DETAILS, RESET_USER_DETAILS, SET_USER_DETAILS_LOADING } from '../../types';
import { getAllPosts } from '../post/post';
import { logoutUser } from '../auth/auth';

export const getUserDetails = (userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_USER_DETAILS_LOADING })

      const response = await axios.get(`/user/userDetails/${userId}`);
      const { data } = response;

      dispatch({
        type: GET_USER_DETAILS,
        payload: data
      })
    } catch (error) {
      if (error.response.status === 500) {
        dispatch(logoutUser());
      }
      console.log(error)
    }
  }
}

export const resetUserDetails = () => {
  return {
    type: RESET_USER_DETAILS
  }
}

export const updateUserDetails = (newUserDetails, closeModal) => {
  return async (dispatch) => {
    try {
      await axios.put(`/user/userDetails/${newUserDetails.id}`, newUserDetails)
      closeModal()
      dispatch(getUserDetails(newUserDetails.id))
    } catch (error) {
      console.log(error);
    }
  }
}

export const followUser = (ownerId, visitorId, actionFrom) => {
  return async (dispatch) => {
    try {
      await axios.post('/user/userDetails/follow', {}, {
        params: {
          ownerId,
          visitorId
        }
      })
      if (actionFrom === 'dropdown') {
        dispatch(getUserDetails(ownerId));
        dispatch(getAllPosts({}));
        return;
      }

      dispatch(getUserDetails(visitorId));
    } catch (error) {
      console.log(error);
    }
  }
}

export const uploadUserImg = (formData, config, userId) => {
  return async (dispatch) => {
    try {
      await axios.put(`/user/userDetails/${userId}/upload`, formData, config);
      dispatch(getUserDetails(userId));
      dispatch(getAllPosts());
    } catch (error) {
      console.log(error);
    }
  }
}
