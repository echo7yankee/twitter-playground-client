import React, { useEffect, useState } from 'react'
//style
// import style from './messages.module.css';
//Components
import { MessagesSearch } from '../MessagesSearch/MessagesSearch';
import { UsersInMessages } from '../UsersInMessages/UsersInMessages';

export const MessagesView = ({ user }) => {
  return (
    user.id
      ? <div>
        <MessagesSearch
          user={user}
        />
        {!user.social.usersToMessage.length
          && <div className="divider" style={{ height: '1px' }} />}
        <UsersInMessages users={user.social.usersToMessage} />
      </div>
      : null
  )
}
