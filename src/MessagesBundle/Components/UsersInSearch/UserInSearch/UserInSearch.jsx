import React from 'react';
//rreact router dom
import { Link } from 'react-router-dom'
//style
import style from './userInSearch.module.css';
//Components
import { TweetProfileImg } from '../../../../TweetsBundle/Components/TweetProfileImg/TweetProfileImg';

export const UserInSearch = ({ user, userAdmin, onClick, isLink }) => {
  return (
    isLink
      ? <Link
        to={{
          pathname: `/dashboard/messages/${user.id}`,
          state: { userVisitor: user, userAdmin }
        }}
        className={style.userInSearchLink}
      >
        <li className={style.userInSearchItem} onClick={onClick}>
          <TweetProfileImg
            profileImg={user.profileImg}
            classNameIcon='placeholder-profile-img-reply'
            classNameDiv='tweet-profile-img-container-reply mr-1'
            onMouseOver={null}
          />
          <span><b>{user.username}</b></span>
        </li>
      </Link>
      : <li className={style.userInSearchItem} onClick={onClick}>
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
