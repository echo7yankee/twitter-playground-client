import React from 'react'
//style
// import style from './messages.module.css';
//Components
import { MessagesSearch } from '../MessagesSearch/MessagesSearch';
import { UsersInMessages } from '../UsersInMessages/UsersInMessages';
import { UsersInSearchDummy } from '../../../GlobalComponents/Dummies/UsersInSearchDummy/UsersInSearchDummy';

export const MessagesView = ({ user }) => {
  return (
    <div>
      <MessagesSearch
        user={user}
      />
      {user.id && !user.social.usersToMessage.length
        && <div className="divider" style={{ height: '1px' }} />}
      {user.id
        ? <UsersInMessages users={user.social.usersToMessage} />
        : <>
          <UsersInSearchDummy />
          <UsersInSearchDummy />
          <UsersInSearchDummy />
        </>
      }
    </div>

  )
}
