import {
  SET_ERRORS_LOGIN,
  SET_AUTH_LOADING,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  UNSET_ERRORS,
  SET_ERRORS_REGISTER
} from '../../types';
import configData from '../../../assets/configs/timers.json';
import axios from 'axios';

export function registerUser(credentials, history) {
  return async dispatch => {
    try {

      dispatch({
        type: SET_AUTH_LOADING
      })

      const response = await axios.post('/user/register', credentials);
      const { data } = response;

      setAuthorizationHeader(data.token)

      dispatch({
        type: SET_AUTHENTICATED
      })

      history.push('/dashboard');

    } catch (error) {
      console.log(error)
      dispatch({
        type: SET_ERRORS_REGISTER,
        payload: error.response && error.response.data
      })
      setTimeout(() => {
        dispatch({
          type: UNSET_ERRORS
        })
      }, configData.TimeUntillWipingAuthError)
    }
  }
}

export function loginUser(credentials, history) {
  return async dispatch => {
    try {
      dispatch({
        type: SET_AUTH_LOADING
      })

      const response = await axios.post('/user/login', credentials);
      const { data } = response;

      setAuthorizationHeader(data.token, data.profileImg)

      dispatch({
        type: SET_AUTHENTICATED
      })

      history.push('/dashboard');

    } catch (error) {
      console.log(error)
      dispatch({
        type: SET_ERRORS_LOGIN,
        payload: error.response && error.response.data
      })

      setTimeout(() => {
        dispatch({
          type: UNSET_ERRORS
        })
      }, configData.TimeUntillWipingAuthError)
    }
  }
}


export function logoutUser() {
  return async (dispatch) => {
    try {
      localStorage.removeItem('FBIdToken');
      delete axios.defaults.headers.common.Authorization;
      dispatch({ type: SET_UNAUTHENTICATED });
    } catch (error) {
      console.log(error);
    }
  }
}

const setAuthorizationHeader = (token, ownerProfileImg) => {
  const FBIdToken = token;
  localStorage.setItem('FBIdToken', FBIdToken);
  localStorage.setItem('ownerProfileImg', ownerProfileImg);
  axios.defaults.headers.common.Authorization = FBIdToken;
}
