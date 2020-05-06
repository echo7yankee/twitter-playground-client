import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';
//style
import style from './chat.module.css';
//Components
import { PageTitle } from '../../../GlobalComponents/PageTitle/PageTitle';
import { ChatForm } from './ChatForm/ChatForm';

let socket;

export const Chat = ({ history }) => {
  const ENDPOINT = 'localhost:5000';
  const userVisitor = history.location && history.location.state.userVisitor;
  const userAdmin = history.location && history.location.state.userAdmin

  //use state
  const [message, setMessage] = useState('');

  useEffect(() => {
    const name = userAdmin.username;
    const room = '123'
    socket = io(ENDPOINT);


    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    })

    return () => {
      socket.emit('disconnect');
      socket.disconnect();
    }

  }, [userAdmin.username, userAdmin.id, userVisitor.social.followers, ENDPOINT])

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  console.log('VISITOR', userVisitor);
  console.log('ADMIN', userAdmin);


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
