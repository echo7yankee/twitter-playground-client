import React from 'react';
//style
import style from './chatMessages.module.css';
//Components
import { ChatMessage } from './ChatMessage/ChatMessage';
import ScrollToBottom from 'react-scroll-to-bottom';

export const ChatMessages = ({ messages, userAdmin, userVisitor }) => {
  return (
    <ScrollToBottom
      className={style.chatMessages}>
      <ul className={style.chatMessagesItems}>
        {messages.map((message, index) =>
          <ChatMessage
            key={index}
            message={message}
            userAdmin={userAdmin}
            userVisitor={userVisitor}
          />)}
      </ul>
    </ScrollToBottom>
  )
}
