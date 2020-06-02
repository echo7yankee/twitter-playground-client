import React from 'react';
import ReactEmoji from 'react-emoji';
//style
import style from './chatMessage.module.css';
//Components
import { TweetProfileImg } from '../../../../../TweetsBundle/Components/TweetProfileImg/TweetProfileImg';

export const ChatMessage = ({ message, userAdmin, userVisitor }) => {
  return (
    <li className={userAdmin.username === message.user
      ? style.chatMessageItemAdmin
      : style.chatMessageItemVisitor}>
      <span>
        {userAdmin.username !== message.user
          ? null
          : <TweetProfileImg
            profileImg={userAdmin.profileImg}
            classNameIcon='placeholder-profile-img-reply'
            classNameDiv='tweet-profile-img-container-reply mr-1'
            onMouseOver={null}
          />}
      </span>
      <span>
        {ReactEmoji.emojify(message.text)}
      </span>
      <span>
        {userAdmin.username !== message.user
          && <TweetProfileImg
            profileImg={userVisitor.profileImg}
            classNameIcon='placeholder-profile-img-reply'
            classNameDiv='tweet-profile-img-container-reply mr-1'
            onMouseOver={null}
          />}
      </span>
    </li>
  )
}
