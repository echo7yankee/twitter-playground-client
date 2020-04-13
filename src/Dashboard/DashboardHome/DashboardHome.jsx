import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';

//assets
import spinner from '../../assets/gifs/spinner.gif';
//style
import style from './dashboardHome.module.css';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { addPost, getAllPosts, toggleEdit, editPost } from '../../Redux/actions/post/post';
import { getUserDetails } from '../../Redux/actions/user/user';
//Dashboard constants
import { DashboardHomeConstants } from './Constants/DashboardHomeConstants';
//components
import { Menu } from '../Menu/Menu';
import { Tweets } from '../../TweetsBundle/Tweets';
import { Trends } from '../Trends/Trends';
import { PageTitle } from '../../GlobalComponents/PageTitle/PageTitle';

export const DashboardHome = () => {

  //redux
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userDetails);
  const posts = useSelector(state => state.post.posts);
  const isLoading = useSelector(state => state.post.isLoading);

  // console.log(posts);


  //token
  const token = localStorage.FBIdToken;
  let userId;
  if (token) {
    userId = jwt.decode(token).params.id;
  }

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getUserDetails(userId));
  }, [dispatch, userId])

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

  return user.id ? (
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
      {isLoading ? <div className={style.dashboardHomeSpinnerContainer}>
        <img src={spinner} alt='spinner' />
      </div> : null}
    </div>
  ) : null
}
