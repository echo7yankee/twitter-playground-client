import axios from 'axios';
import { GET_POSTS, SET_POSTS_LOADING, RESET_POSTS, GET_POST, RESET_POST } from '../../types';

export function addPost(post, userData) {
  return async (_dispatch) => {
    try {
      await axios.post('/post', post, {
        params: {
          userId: userData.userId,
          username: userData.username,
          profileImg: userData.profileImg
        }
      })

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

export function removePost(postId) {
  return async (_dispatch) => {
    try {
      await axios.delete(`/post/${postId}`);
    } catch (error) {
      console.log(error);
    }
  }
}

export function editPost(postId, newPost) {
  return async (_dispatch) => {
    try {
      await axios.put(`/post/${postId}`, newPost)
    } catch (error) {
      console.log(error);
    }
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
  return async (_dispatch) => {
    try {
      await axios.post(`/postComment`, comment, {
        params: {
          userId,
          postId
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function removePostComment(postCommentId) {
  return async (_dispatch) => {
    try {
      await axios.delete(`/postComment/${postCommentId}`);
    } catch (error) {
      console.log(error);
    }
  }
}

export function editPostComment(updatedCommentId, updatedComment) {
  return async (_dispatch) => {
    try {
      await axios.put(`/postComment/${updatedCommentId}`, updatedComment);
    } catch (error) {
      console.log(error);
    }
  }
}
