import axios from 'axios';
import { GET_POSTS, SET_POSTS_LOADING, RESET_POSTS, GET_POST, RESET_POST, ADD_POSTS, REMOVE_POST, SET_POST_IS_EDIT, EDIT_POST, CANCEL_EDIT, ADD_POST_COMMENT, REMOVE_POST_COMMENT } from '../../types';
import { displayNotification } from '../notificationToaster/notificationToaster';
import { GlobalConstants } from '../../../utils/constants/GlobalConstants';

export function addPost(post, userData) {
  return async (dispatch) => {
    try {
      const response = await axios.post('/post', post, {
        params: {
          userId: userData.userId,
          username: userData.username,
          profileImg: userData.profileImg
        }
      })
      const { data } = response;

      dispatch({
        type: ADD_POSTS,
        payload: data
      })

      dispatch(displayNotification(
        GlobalConstants.SUCCESS.SUCCESS_ADD_POST.TEXT,
        GlobalConstants.SUCCESS.SUCCESS_ADD_POST.NOTIFICATION_TYPE,
      ));

    } catch (error) {
      console.log(error)
    }
  }
}

export function getAllPosts(params) {
  return async (dispatch) => {
    try {

      dispatch({
        type: SET_POSTS_LOADING
      })

      const response = await axios.get('/post/all', {
        params
      });
      const { data } = response;

      dispatch({
        type: GET_POSTS,
        payload: data
      })

    } catch (error) {
      console.log(error)
    }
  }
}

export function getPost(postId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/post/${postId}`);
      const { data } = response;

      dispatch({
        type: GET_POST,
        payload: data
      })

    } catch (error) {
      console.log(error);
    }
  }
}

export function resetPosts() {
  return {
    type: RESET_POSTS
  }
}

export function resetPost() {
  return {
    type: RESET_POST
  }
}

export function removePost(id) {
  return async (dispatch) => {
    try {
      await axios.delete(`/post/${id}`);
      dispatch({ type: REMOVE_POST, id })
      dispatch(displayNotification(
        GlobalConstants.SUCCESS.SUCCESS_REMOVE_POST.TEXT,
        GlobalConstants.SUCCESS.SUCCESS_REMOVE_POST.NOTIFICATION_TYPE,
      ));
    } catch (error) {
      console.log(error);
    }
  }
}

export function setPostOnEdit(id) {
  return {
    type: SET_POST_IS_EDIT,
    id
  }
}

export function editPost(postId, newPost) {
  return async (dispatch) => {
    try {
      await axios.put(`/post/${postId}`, newPost)
      dispatch({
        type: EDIT_POST,
        payload: {
          postId,
          newPost
        }
      })
      dispatch(displayNotification(
        GlobalConstants.SUCCESS.SUCCESS_EDIT_POST.TEXT,
        GlobalConstants.SUCCESS.SUCCESS_EDIT_POST.NOTIFICATION_TYPE,
      ));
    } catch (error) {
      console.log(error);
    }
  }
}

export function cancelEdit(id) {
  return {
    type: CANCEL_EDIT,
    id
  }
}

export function likePost(postId, userWhoLikedPostId) {
  return async (_dispatch) => {
    try {
      await axios.put(`/post/${postId}/like`, {}, {
        params: {
          userId: userWhoLikedPostId
        }
      })

    } catch (error) {
      console.log(error)
    }
  }
}

export function votePoll(postId, voteContainer) {
  return async (_dispatch) => {
    try {
      await axios.put(`/post/${postId}/poll-vote`, voteContainer)
    } catch (error) {
      console.log(error)
    }
  }
}

export function createPostComment(userId, postId, comment) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/postComment`, comment, {
        params: {
          userId,
          postId
        }
      })

      const { data } = response;

      dispatch({
        type: ADD_POST_COMMENT,
        payload: data
      })

      dispatch(displayNotification(
        GlobalConstants.SUCCESS.SUCCESS_ADD_POST_COMMENT.TEXT,
        GlobalConstants.SUCCESS.SUCCESS_ADD_POST_COMMENT.NOTIFICATION_TYPE,
      ));
    } catch (error) {
      console.log(error);
    }
  }
}

export function removePostComment(postId, id) {
  return async (dispatch) => {
    try {
      await axios.delete(`/postComment/${id}`);
      dispatch({
        type: REMOVE_POST_COMMENT,
        payload: {
          postId,
          id
        }
      })
      dispatch(displayNotification(
        GlobalConstants.SUCCESS.SUCESS_REMOVE_POST_COMMENT.TEXT,
        GlobalConstants.SUCCESS.SUCESS_REMOVE_POST_COMMENT.NOTIFICATION_TYPE,
      ));
    } catch (error) {
      console.log(error);
    }
  }
}

export function editPostComment(updatedCommentId, updatedComment) {
  return async (dispatch) => {
    try {
      await axios.put(`/postComment/${updatedCommentId}`, updatedComment);
      dispatch(displayNotification(
        GlobalConstants.SUCCESS.SUCCESS_EDIT_POST_COMMENT.TEXT,
        GlobalConstants.SUCCESS.SUCCESS_EDIT_POST_COMMENT.NOTIFICATION_TYPE,
      ));
    } catch (error) {
      console.log(error);
    }
  }
}
