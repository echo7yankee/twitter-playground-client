import React from 'react';

//Style
import style from './tweetProfileResume.module.css';
//Utils/Services/Constants
import { getFollowButtonState } from '../../../utils/services/getFollowButtonState';
//Components
import { TweetProfileImg } from '../TweetProfileImg/TweetProfileImg';

export const TweetProfileResume = ({ post, user }) => {
  return (
    <div className={style.tweetProfileResumeOuter}>
      <div
        className={style.tweetProfileResume}>
        <header className={style.tweetProfileResumeHeader}>
          <TweetProfileImg
            profileImg={post.user.profileImg}
            classNameIcon='placeholder-profile-img'
            classNameDiv='tweet-profile-img-container mr-1'
            onMouseOver={null}
          />
          {user.id !== post.userId
            && <button className={`tweet-button ${getFollowButtonState(user.id, post.user)
              ? 'tweet-button-filled'
              : 'tweet-button-empty'}`}>
              {getFollowButtonState(user.id, post.user) ? 'Unfollow' : 'Follow'}
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
    </div>
  )
}
