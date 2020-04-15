import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../../Redux/actions/post/post';
import { getUserDetails } from '../../../Redux/actions/user/user';

//style
import style from './notificationsItems.module.css';
//Components
import { NotificationItem } from '../NotificationItem/NotificationItem';

export const NotificationsItems = () => {

  //redux
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts)
  const user = useSelector((state) => state.user.userDetails);
  //token
  const token = localStorage.FBIdToken;
  let userId;
  if (token) {
    userId = jwt.decode(token).params.id;
  }

  const userFollows = user.social && user.social.following

  useEffect(() => {
    dispatch(getUserDetails(userId))
  }, [dispatch, userId,]);
  useEffect(() => {
    dispatch(getAllPosts({
      userId: userFollows
    }));
  }, [dispatch, userFollows]);

  return (
    <div className={style.notificationsItems}>
      {
        posts.length > 0
          ? posts.map((post) => {
            return <NotificationItem key={post.id} post={post} />
          })
          : null
      }
    </div>
  )
}
