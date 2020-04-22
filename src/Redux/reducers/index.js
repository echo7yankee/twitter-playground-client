import { combineReducers } from 'redux';
import { authReducer } from './auth/auth'
import { userReducer } from './user/user';
import { postReducer } from './post/post';
import { notificationReducer } from './notification/notification';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  notification: notificationReducer,
})
