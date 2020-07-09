import React, { useEffect } from 'react';
//style
import style from './dashboardHome.module.css';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { addPost, getAllPosts, editPost, resetPosts, removePost, setPostOnEdit, cancelEdit } from '../../Redux/actions/post/post';
import { getUserDetails, resetUserDetails, getUsers } from '../../Redux/actions/user/user';
//Dashboard constants
import { DashboardHomeConstants } from './Constants/DashboardHomeConstants';
//components
import { Tweets } from '../../TweetsBundle/Components/Tweets/Tweets';
import { PageTitle } from '../../GlobalComponents/PageTitle/PageTitle';
import { userIdFromToken } from '../../utils/services/userIdFromToken';
import { TweetDummy } from '../../GlobalComponents/Dummies/TweetDummy/TweetDummy';

export const DashboardHome = ({ history }) => {
  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  const users = useSelector((state) => state.user.usersInSearch);
  const posts = useSelector((state) => state.post.posts);
  const isLoading = useSelector(state => state.post.isLoading);
  const { notificationMessage, notificationType } = useSelector((state) => state.notificationToaster)

  useEffect(() => {
    dispatch(getAllPosts({}));
    let postsInterval = setInterval(() => {
      dispatch(getAllPosts({}));
    }, 120000)
    dispatch(getUserDetails(userIdFromToken()));

    return () => {
      dispatch(resetPosts());
      dispatch(resetUserDetails());
      window.clearInterval(postsInterval)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers({ _id: user.social?.following }))
  }, [posts, dispatch, user.social])

  const handleAddPost = (post) => {
    const userData = {
      userId: user.id,
      username: user.fName + ' ' + user.lName,
      profileImg: user.profileImg,
    }
    dispatch(addPost(post, userData));
  }

  const remove = (id) => {
    dispatch(removePost(id))
  }

  const handleEditPost = (updatedPost) => {
    dispatch(editPost(updatedPost.id, updatedPost))
  }

  const setPostEdit = (id) => {
    dispatch(setPostOnEdit(id));
  }

  const cancelButtonAction = (id) => {
    dispatch(cancelEdit(id))
  }

  return !user.id && isLoading
    ? <>
      <TweetDummy />
      <TweetDummy />
      <TweetDummy />
      <TweetDummy />
      <TweetDummy />
      <TweetDummy />
    </>
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
          users={users}
          posts={posts}
          remove={remove}
          cancelButtonAction={cancelButtonAction}
          setPostOnEdit={setPostEdit}
          history={history}
          notificationMessage={notificationMessage}
          notificationType={notificationType}
        />
      </div>
    )
}
