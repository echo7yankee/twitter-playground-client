import React from 'react';
//style
import style from './usersInMessages.module.css';
import { UserInSearch } from '../UsersInSearch/UserInSearch/UserInSearch';

export const UsersInMessages = ({ users }) => {
  return (
    <div>
      <ul>
        {users.map((user) => <UserInSearch
          key={user.id}
          user={user}
          onClick={null}
          isLink={true}
        />)}
      </ul>
    </div>
  )
}
