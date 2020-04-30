import React, { useEffect, useState } from 'react';
//style
import style from './dashboardHome.module.css';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { addPost, getAllPosts, editPost, resetPosts, removePost } from '../../Redux/actions/post/post';
import { getUserDetails, resetUserDetails } from '../../Redux/actions/user/user';
//Dashboard constants
import { DashboardHomeConstants } from './Constants/DashboardHomeConstants';
//components
import { Tweets } from '../../TweetsBundle/Components/Tweets/Tweets';
import { PageTitle } from '../../GlobalComponents/PageTitle/PageTitle';
import { userIdFromToken } from '../../utils/services/userIdFromToken';
import { addNewPost } from '../Services/addNewPost';
import { getUpdatedPost } from '../Services/getUpdatedPost';
import { TweetDummy } from '../../GlobalComponents/TweetDummy/TweetDummy';

export const DashboardHome = ({ history }) => {
  //useState
  const [postsArr, setPosts] = useState([]);
  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  const posts = useSelector((state) => state.post.posts);
  const isLoading = useSelector(state => state.post.isLoading);

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
    setPosts(posts);
  }, [posts])

  const handleAddPost = (post) => {
    const userData = {
      userId: user.id,
      username: user.fName + ' ' + user.lName,
      profileImg: user.profileImg,
    }
    setPosts([addNewPost(post, userData), ...postsArr])
    dispatch(addPost(post, userData));
  }

  const remove = (id, animateRemove) => {
    animateRemove();
    setTimeout(() => {
      setPosts(postsArr.filter((post) => post.uuid !== id));
    }, 300);
    dispatch(removePost(id))
  }

  const handleEditPost = (updatedPost) => {
    setPosts(getUpdatedPost(postsArr, updatedPost))
    dispatch(editPost(updatedPost.uuid, updatedPost))
  }

  const setPostOnEdit = (id) => {
    setPosts(postsArr.map((post) => {
      if (post.uuid === id) {
        return {
          ...post,
          isEdit: true
        }
      }
      return post;
    }))
  }

  const cancelButtonAction = (id) => {
    setPosts(postsArr.map((post) => {
      if (post.uuid === id) {
        return {
          ...post,
          isEdit: false
        }
      }
      return post;
    }))
  }

  return !user.id && isLoading
    ? <>
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
          posts={postsArr}
          remove={remove}
          cancelButtonAction={cancelButtonAction}
          setPostOnEdit={setPostOnEdit}
          history={history}
        />
        {/* <TweetDummy /> */}
      </div>
    )
}
