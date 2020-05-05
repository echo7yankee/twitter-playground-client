import React from 'react';
//style
import style from './messagesModalButton.module.css';

export const MessagesModalButton = ({ newUsers, onClick, buttonText }) => {
  return (
    <button
      onClick={onClick}
      disabled={!newUsers.length}
      className={!newUsers.length ? style.messagesModalTopButtonDisabled : ''}
    >
      {buttonText}
    </button>
  )
}
