import { SET_POSTS_LOADING, GET_POSTS, SET_POST_IS_EDIT, SET_POST_COMMENT_IS_EDIT, RESET_POSTS, GET_POST, RESET_POST } from "../../types";

const initState = {
  isLoading: false,
  posts: [],
  singlePost: {},
}

export function postReducer(state, action) {
  if (!state) {
    state = initState
  }

  switch (action.type) {
    case SET_POSTS_LOADING: return { ...state, isLoading: true };
    case GET_POSTS: return { ...state, isLoading: false, posts: action.payload };
    case GET_POST: return { ...state, singlePost: action.payload };
    case RESET_POSTS: return { ...state, posts: [] };
    case RESET_POST: return { ...state, singlePost: {} };
    case SET_POST_IS_EDIT: return {
      ...state,
      posts: state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            isEdit: action.payload.isEditable ? true : false,
          }
        }
        return post;
      })
    }
    case SET_POST_COMMENT_IS_EDIT: return {
      ...state,
      posts: state.posts.map((post) => {
        if (post.id === action.payload.postId) {
          const newPostComments = post.postComments.map((postComment) => {
            if (postComment.id === action.payload.postCommentId) {
              postComment = {
                ...postComment,
                isEdit: action.payload.isEditable ? true : false,
              }
            }
            return postComment;
          })
          post = {
            ...post,
            postComments: newPostComments
          }
        }
        return post;
      })
    }
    default: return state;
  }
}
