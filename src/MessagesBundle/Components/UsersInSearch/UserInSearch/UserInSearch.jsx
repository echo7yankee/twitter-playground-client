import React from 'react';
//rreact router dom
import { Link } from 'react-router-dom'
//style
import style from './userInSearch.module.css';
//Components
import { TweetProfileImg } from '../../../../TweetsBundle/Components/TweetProfileImg/TweetProfileImg';

export const UserInSearch = ({ user, userAdmin, onClick, isLink, handleAcceptUser }) => {
  const room = userAdmin?.social?.roomIds.find((roomId) => {
    const id = user.social?.roomIds
      .find((visitorRoomId) => roomId.id === visitorRoomId.id)
    return id
  });

  return (
    isLink
      ? <Link
        to={{
          pathname: `/dashboard/messages/${user.id}`,
          state: { userVisitor: user, userAdmin }
        }}
        onClick={(e) => !room?.hasAccepted && e.preventDefault()}
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
          {
            room?.hasAccepted === null
              ? <span>Pending request</span>
              : !room?.hasAccepted
                ? <div>
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
