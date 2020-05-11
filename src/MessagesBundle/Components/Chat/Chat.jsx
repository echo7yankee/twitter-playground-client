import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';
import { config } from '../../../utils/constants/Environment';
//style
import style from './chat.module.css';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, addMessages, resetMessages } from '../../../Redux/actions/messages/messages';
//Components
import { PageTitle } from '../../../GlobalComponents/PageTitle/PageTitle';
import { ChatForm } from './ChatForm/ChatForm';
import { ChatMessages } from './ChatMessages/ChatMessages';
import { CustomSpinner } from '../../../GlobalComponents/CustomSpinner/CustomSpinner';

let socket;

export const Chat = ({ history }) => {
  //Redux
  const dispatch = useDispatch();
  const chatMessages = useSelector((state) => state.message.messages);
  const isLoading = useSelector((state) => state.message.isLoading);

  const { url } = config;
  const ENDPOINT = url.API_URL;
  const userVisitor = history.location && history.location.state.userVisitor;
  const userAdmin = history.location && history.location.state.userAdmin
  const name = userAdmin.username;
  const room = userAdmin.social.roomIds.find((roomId) => {
    const userVisitorRoomId = userVisitor.social.roomIds
      .find((visitorRoomId) => roomId === visitorRoomId);
    return userVisitorRoomId
  });

  //use state
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    dispatch(getMessages(room));
    return () => dispatch(resetMessages());
  }, [dispatch, room])

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    })
    setMessages(chatMessages.messages);

    return () => {
      socket.emit('disconnect');
      socket.disconnect();
    }

  }, [name,
    room,
    userAdmin.id,
    userVisitor.social.followers,
    chatMessages.messages,
    ENDPOINT])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault();
    const filter = {
      roomId: room
    }
    const params = {
      user: userAdmin.username,
      text: message
    }
    if (message) {
      socket.emit('sendMessage', message, name, room, () => setMessage(''))
      dispatch(addMessages(filter, params))
    }
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  return (
    messages ?
      <div>
        <PageTitle
          name={userVisitor.username}
          hasBackButton={false}
        />
        <div className={style.chat}>
          {!isLoading
            ? <ChatMessages
              messages={messages}
              userAdmin={userAdmin}
              userVisitor={userVisitor}
            />
            : <div className={style.chatSpinnerContainer}>
              <CustomSpinner className={style.chatSpinnerImg} />
            </div>
          }
          <ChatForm
            onSubmit={handleSubmit}
            onChange={handleChange}
            value={message}
            type='text'
            placeholder='Send message...'
          />
        </div>
      </div>
      : null
  )
}
