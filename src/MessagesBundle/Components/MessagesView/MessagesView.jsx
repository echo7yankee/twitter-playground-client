import React, { useState } from 'react'
//style
// import style from './messages.module.css';
//utils
import { filterUsersBySearch } from '../../Services/filterUsersBySearch';
//Components
import { MessagesSearch } from '../MessagesSearch/MessagesSearch';
import { UsersInMessages } from '../UsersInMessages/UsersInMessages';
import { UsersInSearchDummy } from '../../../GlobalComponents/Dummies/UsersInSearchDummy/UsersInSearchDummy';

export const MessagesView = ({ user, handleAcceptUser, cancelAcceptUser }) => {
  const [search, setSearch] = useState('');
  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div>
      <MessagesSearch
        user={user}
        onChange={handleChange}
        value={search}
      />
      {user.id && !user.social.usersToMessage.length
        && <div className="divider" style={{ height: '1px' }} />}
      {user.id
        ? <UsersInMessages
          userAdmin={user}
          users={filterUsersBySearch(user.social.usersToMessage, search)}
          handleAcceptUser={handleAcceptUser}
          cancelAcceptUser={cancelAcceptUser}
        />
        : <>
          <UsersInSearchDummy />
          <UsersInSearchDummy />
          <UsersInSearchDummy />
        </>
      }
    </div>

  )
}
