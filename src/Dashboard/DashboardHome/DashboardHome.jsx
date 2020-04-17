import React, { useEffect } from 'react';
//style
import style from './dashboardHome.module.css';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { addPost, getAllPosts, toggleEdit, editPost, resetPosts } from '../../Redux/actions/post/post';
import { getUserDetails, resetUserDetails } from '../../Redux/actions/user/user';
//Dashboard constants
import { DashboardHomeConstants } from './Constants/DashboardHomeConstants';
//components
import { Tweets } from '../../TweetsBundle/Components/Tweets/Tweets';
import { PageTitle } from '../../GlobalComponents/PageTitle/PageTitle';
import { SpinnerTweets } from '../../GlobalComponents/SpinnerTweets/SpinnerTweets';
import { userIdFromToken } from '../../utils/services/userIdFromToken';

export const DashboardHome = () => {
  //redux
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userDetails);
  const posts = useSelector(state => state.post.posts);
  const isLoading = useSelector(state => state.post.isLoading);

  useEffect(() => {
    dispatch(getAllPosts({}));
    dispatch(getUserDetails(userIdFromToken()));

    return () => {
      dispatch(resetPosts());
      dispatch(resetUserDetails());
    }
  }, [dispatch])

  const handleAddPost = (post) => {
    const userData = {
      userId: user.id,
      username: user.fName + ' ' + user.lName,
      profileImg: user.profileImg,
    }
    dispatch(addPost(post, userData));
  }

  const handleEditPost = (post) => {
    dispatch(editPost(post.id, post))
  }

  const cancelButtonAction = (postId, isEditable) => {
    dispatch(toggleEdit(postId, isEditable));
  }

  return isLoading
    ? <SpinnerTweets />
    : (
      <div className={style.dashboardHome}>
        <PageTitle
          name={DashboardHomeConstants.DASHBOARD_HOME_TITLE}
          hasBackButton={false}
        />
        <Tweets
          handleAddPost={handleAddPost}
          handleEditPost={handleEditPost}
          user={user}
          posts={posts}
          cancelButtonAction={cancelButtonAction}
        />
      </div>
    )
}
