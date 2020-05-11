import React from 'react';
//style
import style from './usersTag.module.css';
import { UserTag } from './UserTag/UserTag';

export const UsersTag = ({ newUsers, onClick }) => {
  return (
    <div className={style.usersTag}>
      <ul className={style.usersTagItems}>
        {newUsers.map((newUser) => <UserTag
          key={newUser.id}
          newUser={newUser}
          onClick={onClick}
        />)}
      </ul>
    </div>
  )
}
