import React, { useState } from 'react'
//style
import style from './chat.module.css';
//Components
import { PageTitle } from '../../../GlobalComponents/PageTitle/PageTitle';
import { ChatForm } from './ChatForm/ChatForm';

export const Chat = ({ history }) => {
  const userVisitor = history.location && history.location.state.user;
  //use state
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  return (
    <div>
      <PageTitle
        name={userVisitor.username}
        hasBackButton={false}
      />
      <div className={style.chat}>
        <ChatForm
          onSubmit={handleSubmit}
          onChange={handleChange}
          value={message}
          type='text'
          placeholder='Send message...'
        />
      </div>
    </div>
  )
}
