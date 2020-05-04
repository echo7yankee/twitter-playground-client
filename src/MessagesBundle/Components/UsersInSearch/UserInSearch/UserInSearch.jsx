import React from 'react';
//style
import style from './userInSearch.module.css';
//Components
import { TweetProfileImg } from '../../../../TweetsBundle/Components/TweetProfileImg/TweetProfileImg';

export const UserInSearch = ({ user, onClick }) => {
  return (
    <li className={style.userInSearchItem} onClick={() => onClick(user)}>
      <TweetProfileImg
        profileImg={user.profileImg}
        classNameIcon='placeholder-profile-img-reply'
        classNameDiv='tweet-profile-img-container-reply mr-1'
        onMouseOver={null}
      />
      <span><b>{user.username}</b></span>
    </li>
  )
}
