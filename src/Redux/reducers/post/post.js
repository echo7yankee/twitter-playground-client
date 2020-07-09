import { SET_POSTS_LOADING, GET_POSTS, RESET_POSTS, GET_POST, RESET_POST, ADD_POSTS, REMOVE_POST, SET_POST_IS_EDIT, EDIT_POST, CANCEL_EDIT, ADD_POST_COMMENT, REMOVE_POST_COMMENT } from "../../types";

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
    case ADD_POSTS: return { ...state, posts: [action.payload, ...state.posts] };
    case ADD_POST_COMMENT: return {
      ...state,
      posts: state.posts.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            postComments: [action.payload, ...post.postComments]
          }
        }

        return post;
      })
    }
    case REMOVE_POST_COMMENT: return {
      ...state,
      posts: state.posts.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            postComments: post.postComments.filter((postComment) => postComment.id !== action.payload.id)
          }
        }
        return post;
      })
    }
    case REMOVE_POST: return {
      ...state,
      posts: state.posts.filter((post) => post.id !== action.id)
    }
    case SET_POST_IS_EDIT: return {
      ...state,
      posts: state.posts.map((post) => {
        if (post.id === action.id) {
          return {
            ...post,
            isEdit: true
          }
        }
        return post;
      })

    }
    case EDIT_POST: return {
      ...state,
      posts: state.posts.map((item) => {
        if (item.id === action.payload.postId) {
          return {
            ...action.payload.newPost,
            isEdit: false
          }
        }
        return item;
      })
    }
    case CANCEL_EDIT: return {
      ...state,
      posts: state.posts.map((post) => {
        if (post.id === action.id) {
          return {
            ...post,
            isEdit: false
          }
        }
        return post;
      })
    }
    case GET_POST: return { ...state, singlePost: action.payload };
    case RESET_POSTS: return { ...state, posts: [] };
    case RESET_POST: return { ...state, singlePost: {} };
    default: return state;
  }
}
