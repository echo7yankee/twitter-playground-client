//axios
import axios from 'axios';
import { GET_USER_DETAILS, RESET_USER_DETAILS, SET_USER_DETAILS_LOADING, GET_USERS, SET_GET_USERS_LOADING } from '../../types';
import { getAllPosts } from '../post/post';
import { logoutUser } from '../auth/auth';
import { GlobalConstants } from '../../../utils/constants/GlobalConstants';
import { displayNotification } from '../notificationToaster/notificationToaster';

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

export const getUsersInSearch = (params) => {
  return async (dispatch) => {
    try {

      dispatch({ type: SET_GET_USERS_LOADING });

      const response = await axios.get('/user/search', {
        params
      })
      const { data } = response;
      dispatch({
        type: GET_USERS,
        payload: data,
      })
    } catch (error) {
      if (error.response.status === 500) {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_USERS,
        payload: [],
      })
      console.log(error)
    }
  }
}

export const resetUserDetails = () => {
  return {
    type: RESET_USER_DETAILS
  }
}

export const updateUserDetails = (newUserDetails, closeModal, location) => {
  return async (dispatch) => {
    try {
      await axios.put(`/user/userDetails/${newUserDetails.id}`, newUserDetails)
      if (location === 'Profile') {
        closeModal()
        dispatch(getUserDetails(newUserDetails.id))
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const turnUserAcceptanceOnTrue = (userId, updatedUserAdmin, room) => {
  return async (_dispatch) => {
    try {
      await axios.put(`/user/userDetails/accept/${userId}`, { room, updatedUserAdmin });
    } catch (error) {
      console.log(error);
    }
  }
}

export const cancelUserAcceptance = (userId, userVisitorId, roomId) => {
  return async (_dispatch) => {
    try {
      await axios.put(`/user/userDetails/cancel/${userId}`, {}, {
        params: {
          userVisitorId,
          roomId
        }
      });
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
      dispatch(displayNotification(
        GlobalConstants.SUCCESS.SUCCESS_PROFILE.TEXT,
        GlobalConstants.SUCCESS.SUCCESS_PROFILE.NOTIFICATION_TYPE,
      ));
    } catch (error) {
      console.log(error);
    }
  }
}
