import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';
//style
import style from './chat.module.css';
//Components
import { PageTitle } from '../../../GlobalComponents/PageTitle/PageTitle';
import { ChatForm } from './ChatForm/ChatForm';
import { ChatMessages } from './ChatMessages/ChatMessages';

let socket;

export const Chat = ({ history }) => {
  const ENDPOINT = 'localhost:5000';
  const userVisitor = history.location && history.location.state.userVisitor;
  const userAdmin = history.location && history.location.state.userAdmin
  const name = userAdmin.username;
  const room = '123'

  //use state
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
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

  }, [name, userAdmin.id, userVisitor.social.followers, ENDPOINT])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((msgs) => [...msgs, message]);
    })

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, name, room, () => setMessage(''))
    }
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
        <ChatMessages
          messages={messages}
          userAdmin={userAdmin}
          userVisitor={userVisitor}
        />
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
