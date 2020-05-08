import React from 'react';
import ReactEmoji from 'react-emoji';
//style
import style from './chatMessage.module.css';

export const ChatMessage = ({ message, userAdmin, userVisitor }) => {
  console.log(message);
  return (
    <li className={userAdmin.username === message.user
      ? style.chatMessageItemAdmin
      : style.chatMessageItemVisitor}>
      <span>
        {userAdmin.username !== message.user
          ? null
          : userAdmin.username}
      </span>
      <span>
        {ReactEmoji.emojify(message.text)}
      </span>
      <span>
        {userAdmin.username !== message.user
          && userVisitor.username}
      </span>
    </li>
  )
}
