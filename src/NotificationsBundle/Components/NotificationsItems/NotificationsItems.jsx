import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, resetPosts } from '../../../Redux/actions/post/post';
import { getUserDetails } from '../../../Redux/actions/user/user';

//style
import style from './notificationsItems.module.css';
//Components
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { SpinnerTweets } from '../../../GlobalComponents/SpinnerTweets/SpinnerTweets';

export const NotificationsItems = () => {
  //redux
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const isLoading = useSelector(state => state.post.isLoading);
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
    if (userFollows && userFollows.length) {
      dispatch(getAllPosts({
        userId: userFollows
      }));
    }

    return () => {
      dispatch(resetPosts());
    }
  }, [dispatch, userFollows]);

  return (
    isLoading
      ? <SpinnerTweets />
      : <div className={style.notificationsItems}>
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
