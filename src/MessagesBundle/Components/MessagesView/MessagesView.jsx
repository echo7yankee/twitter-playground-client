import React, { useEffect, useState } from 'react'
//style
// import style from './messages.module.css';
//Components
import { MessagesSearch } from '../MessagesSearch/MessagesSearch';

export const MessagesView = ({ user }) => {
  return (
    user.id
      ? <div>
        <MessagesSearch
          user={user}
        // setUser={setUser}
        />
        <div className="divider" style={{ height: '1px' }} />
      </div>
      : null
  )
}
