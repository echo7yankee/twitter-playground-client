import React, { useState } from 'react';
import { motion } from 'framer-motion';

//Style
import style from './tweetProfileResume.module.css';
//Utils/Services/Constants
import { getFollowButtonState } from '../../../utils/services/getFollowButtonState';
//Components
import { TweetProfileImg } from '../TweetProfileImg/TweetProfileImg';
import { pushToProfilePage } from '../../../utils/services/pushToProfilePage';
import { getUserFollows } from '../../../utils/services/getUserFollows';

//TODO: ADD NOTIFICATION WHEN FOLLOWING/UNFOLLOWING PERSON ON PROFILE RESUME

export const TweetProfileResume = ({
  post,
  user,
  handleFollow,
  history }) => {

  const [buttonText, setButtonText] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={style.tweetProfileResumeOuter}>
      <div
        className={style.tweetProfileResume}>
        <header className={style.tweetProfileResumeHeader}>
          <div
            onClick={() => {
              pushToProfilePage(`/dashboard/user/${post.username.split(' ').join('')}`,
                history, post, user, getUserFollows(user));
            }}
          >
            <TweetProfileImg
              profileImg={post.user.profileImg}
              classNameIcon='placeholder-profile-img'
              classNameDiv='tweet-profile-img-container mr-1'
              onMouseOver={null}
            />
          </div>
          {user.id !== post.userId
            && <button
              onClick={handleFollow}
              className={`tweet-button ${getFollowButtonState(user.id, post.user)
                ? 'tweet-button-filled'
                : 'tweet-button-empty'}`}
              style={
                getFollowButtonState(user.id, post.user)
                  && buttonText
                  ? { backgroundColor: '#DE4C4A', borderColor: '#DE4C4A' } : {}
              }
              onMouseEnter={() => setButtonText(getFollowButtonState(user.id, post.user) && true)}
              onMouseLeave={() => setButtonText(getFollowButtonState(user.id, post.user) && false)}
            >
              {buttonText
                ? 'Unfollow' :
                getFollowButtonState(user.id, post.user)
                  ? 'Following'
                  : 'Follow'
              }
            </button>}
        </header>
        <div className={style.tweetProfileResumeUsername}>
          {post.user.fName} {post.user.lName}
        </div>
        <div className={style.tweetProfileResumeBio}>
          <span>{post.user.bio}</span>
        </div>
        <div className={style.tweetProfileResumeSocial}>
          <span> <b>{post.user.social.followingCount}</b> Following</span>
          <span> <b>{post.user.social.followersCount}</b> Followers </span>
        </div>
      </div>
    </motion.div>
  )
}
