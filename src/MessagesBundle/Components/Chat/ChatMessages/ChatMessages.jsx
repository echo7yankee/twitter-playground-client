import React from 'react';
//style
import style from './chatMessages.module.css';
//Components
import { ChatMessage } from './ChatMessage/ChatMessage';

export const ChatMessages = ({ messages, userAdmin, userVisitor }) => {
  return (
    <div className={style.chatMessages}>
      <ul className={style.chatMessagesItems}>
        {messages.map((message, index) =>
          <ChatMessage
            key={index}
            message={message}
            userAdmin={userAdmin}
            userVisitor={userVisitor}
          />)}
      </ul>
    </div>
  )
}
