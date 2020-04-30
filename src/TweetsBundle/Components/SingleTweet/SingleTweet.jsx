import React, { useEffect } from 'react';
//style
import style from './singleTweet.module.css';
//services
import { userIdFromToken } from '../../../utils/services/userIdFromToken';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getPost, resetPost } from '../../../Redux/actions/post/post';

//Components
import { PageTitle } from '../../../GlobalComponents/PageTitle/PageTitle';
import { getUserDetails, resetUserDetails } from '../../../Redux/actions/user/user';
import { TweetItem } from '../Tweets/TweetItem';
import { TweetDummy } from '../../../GlobalComponents/Dummies/TweetDummy/TweetDummy';

export const SingleTweet = ({ match, history }) => {
  const postId = match.params.postId;
  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  //use state
  const singlePost = useSelector((state) => state.post.singlePost);

  useEffect(() => {
    dispatch(getPost(postId));

    return () => {
      dispatch(resetPost());
    }
  }, [dispatch, postId]);

  useEffect(() => {
    dispatch(getUserDetails(userIdFromToken()));

    return () => {
      dispatch(resetUserDetails());
    }
  }, [dispatch])

  return (
    user.id && singlePost.id ?
      <div>
        <PageTitle name='Thread' hasBackButton={true} />
        <div className={style.singlePost}>
          <TweetItem
            post={singlePost}
            user={user}
            isSingleTweet={true}
            history={history}
          />
        </div>
      </div> : <TweetDummy />
  )
}
