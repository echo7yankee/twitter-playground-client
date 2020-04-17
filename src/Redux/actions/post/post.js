import axios from 'axios';
import { GET_POSTS, SET_POSTS_LOADING, SET_POST_IS_EDIT, SET_POST_COMMENT_IS_EDIT, RESET_POSTS, GET_POST, RESET_POST } from '../../types';

export function addPost(post, userData) {
  return async (dispatch) => {
    try {
      await axios.post('/post', post, {
        params: {
          userId: userData.userId,
          username: userData.username,
          profileImg: userData.profileImg
        }
      })

      dispatch(getAllPosts({}));

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
  return async (dispatch) => {
    try {
      await axios.delete(`/post/${postId}`);

      dispatch(getAllPosts({}));
    } catch (error) {
      console.log(error);
    }
  }
}

export function toggleEdit(postId, isEditable) {
  return {
    type: SET_POST_IS_EDIT,
    payload: {
      id: postId,
      isEditable
    },
  }
}

export function editPost(postId, newPost) {
  return async (dispatch) => {
    try {
      await axios.put(`/post/${postId}`, newPost)
      dispatch(getAllPosts({}));
    } catch (error) {
      console.log(error);
    }
  }
}

export function likePost(postId, userWhoLikedPostId) {
  return async (dispatch) => {
    try {
      await axios.put(`/post/${postId}/like`, {}, {
        params: {
          userId: userWhoLikedPostId
        }
      })

      dispatch(getAllPosts({}));

    } catch (error) {
      console.log(error)
    }
  }
}

export function votePoll(postId, voteContainer) {
  return async (dispatch) => {
    try {
      await axios.put(`/post/${postId}/poll-vote`, voteContainer)

      dispatch(getAllPosts({}));
      dispatch(getPost(postId))
    } catch (error) {
      console.log(error)
    }
  }
}

export function createPostComment(userId, postId, comment) {
  return async (dispatch) => {
    try {
      await axios.post(`/postComment`, comment, {
        params: {
          userId,
          postId
        }
      })

      dispatch(getAllPosts({}));
    } catch (error) {
      console.log(error);
    }
  }
}

export function removePostComment(postCommentId) {
  return async (dispatch) => {
    try {
      await axios.delete(`/postComment/${postCommentId}`)
      dispatch(getAllPosts({}));
    } catch (error) {
      console.log(error);
    }
  }
}

export function togglePostCommentEdit(postCommentId, postId, isEditable) {
  return {
    type: SET_POST_COMMENT_IS_EDIT,
    payload: {
      postCommentId,
      postId,
      isEditable
    }
  }
}

export function editPostComment(updatedCommentId, updatedComment) {
  return async (dispatch) => {
    try {
      await axios.put(`/postComment/${updatedCommentId}`, updatedComment);
      dispatch(getAllPosts({}))
    } catch (error) {
      console.log(error);
    }
  }
}
