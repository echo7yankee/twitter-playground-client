import React from 'react';
//rreact router dom
import { Link } from 'react-router-dom'
//style
import style from './userInSearch.module.css';
//Components
import { TweetProfileImg } from '../../../../TweetsBundle/Components/TweetProfileImg/TweetProfileImg';

export const UserInSearch = ({ user, room, userAdmin, onClick, isLink, handleAcceptUser }) => {
  return (
    isLink
      ? <Link
        to={{
          pathname: `/dashboard/messages/${user.id}`,
          state: { userVisitor: user, userAdmin, room }
        }}
        onClick={(e) => !room?.hasAccepted && e.preventDefault()}
        className={style.userInSearchLink}
      >
        <li
          style={{ backgroundColor: !room?.hasAccepted && 'rgba(0,0,0,.1)' }}
          className={style.userInSearchItem} onClick={onClick}>
          <TweetProfileImg
            profileImg={user.profileImg}
            classNameIcon='placeholder-profile-img-reply'
            classNameDiv='tweet-profile-img-container-reply mr-1'
            onMouseOver={null}
          />
          <span><b>{user.username}</b> {room?.hasAccepted === false && 'has sent you a request'}</span>
          {
            room?.hasAccepted === null
              ? <div>
                <span>Pending request </span>
              </div>
              : !room?.hasAccepted
                ? <div className={style.userInSearchAcceptance}>
                  <button onClick={() => handleAcceptUser(room)} >Yes</button>
                  <button>No</button>
                </div> : null
          }
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
