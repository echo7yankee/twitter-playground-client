import React, { useEffect, useState } from 'react';

//Style
import style from './tweetProfileResume.module.css';
//Utils/Services/Constants
import { getFollowButtonState } from '../../../utils/services/getFollowButtonState';
//Components
import { TweetProfileImg } from '../TweetProfileImg/TweetProfileImg';

export const TweetProfileResume = ({
  post,
  user,
  handleFollow,
  isAnimateProfileResume,
  setIsAnimateProfileResume }) => {

  const [buttonText, setButtonText] = useState(false);

  useEffect(() => {
    setIsAnimateProfileResume(true);
    return () => {
      setIsAnimateProfileResume(false);
    }
  }, [setIsAnimateProfileResume])

  return (
    <div className={style.tweetProfileResumeOuter}>
      <div
        className={isAnimateProfileResume
          ? style.tweetProfileResumeAnimate
          : style.tweetProfileResume}>
        <header className={style.tweetProfileResumeHeader}>
          <TweetProfileImg
            profileImg={post.user.profileImg}
            classNameIcon='placeholder-profile-img'
            classNameDiv='tweet-profile-img-container mr-1'
            onMouseOver={null}
          />
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
    </div>
  )
}
