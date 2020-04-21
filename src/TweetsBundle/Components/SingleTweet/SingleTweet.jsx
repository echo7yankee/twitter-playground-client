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
import { TweetProfileImg } from '../TweetProfileImg/TweetProfileImg';
import { getPollChoicesFiltered } from '../../../utils/services/getPollChoicesFiltered';
import { TweetPollItems } from '../TweetPoll/Components/TweetPollItems/TweetPollItems';
import { getUserDetails, resetUserDetails } from '../../../Redux/actions/user/user';
import { SpinnerTweets } from '../../../GlobalComponents/SpinnerTweets/SpinnerTweets';

export const SingleTweet = ({ match }) => {

  // TODO: Display the other items too: likes, comments  etc.

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
    user.id ?
      <div>
        <PageTitle name='Thread' hasBackButton={true} />
        <div className={style.singlePost}>
          <div className={style.singlePostHeader}>
            <TweetProfileImg
              profileImg={singlePost.profileImg}
              classNameIcon='placeholder-profile-img'
              classNameDiv='tweet-profile-img-container mr-1'
            />
            <h3>{singlePost.username}</h3>
          </div>
          <div className={style.singlePostContent}>
            <div
              dangerouslySetInnerHTML={{
                __html: singlePost.comment
              }}
            />
            <div>
              {singlePost.poll
                && getPollChoicesFiltered(singlePost.poll.choices).length > 0
                ? <TweetPollItems
                  poll={singlePost.poll}
                  post={singlePost}
                  user={user}
                />
                : null}
            </div>
          </div>
        </div>
      </div> : <SpinnerTweets />
  )
}
