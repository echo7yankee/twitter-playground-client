import React, { useEffect } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, resetPosts } from '../../../Redux/actions/post/post';
import { getUserDetails, resetUserDetails } from '../../../Redux/actions/user/user';

//style
import style from './notificationsItems.module.css';
//Components
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { SpinnerTweets } from '../../../GlobalComponents/SpinnerTweets/SpinnerTweets';
import { userIdFromToken } from '../../../utils/services/userIdFromToken';
import { getUserFollows } from '../../../utils/services/getUserFollows';

export const NotificationsItems = ({ history }) => {
  //redux
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const isLoading = useSelector(state => state.post.isLoading);
  const user = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    dispatch(getUserDetails(userIdFromToken()))

    return () => {
      dispatch(resetUserDetails());
    }
  }, [dispatch]);
  useEffect(() => {
    if (getUserFollows(user) && getUserFollows(user).length) {
      dispatch(getAllPosts({
        userId: getUserFollows(user)
      }));
    }

    return () => {
      dispatch(resetPosts());
    }
  }, [dispatch, user]);

  return (
    isLoading
      ? <SpinnerTweets />
      : <div className={style.notificationsItems}>
        {
          posts.length
            ? posts.map((post, index) => {
              return <NotificationItem
                key={post.id}
                post={post}
                notificationIndex={index}
                user={user}
                history={history}
              />
            })
            :
            <div className={style.notificationItemWarningMessage}>
              <p>
                Nothing to see here - yet
             </p>
              <p>When you follow someone, you will see their posts here</p>
            </div>
        }
      </div>
  )
}
