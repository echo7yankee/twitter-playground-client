import React from 'react';
//style
import style from './usersInSearch.module.css';
//Components
import { UserInSearch } from './UserInSearch/UserInSearch';

export const UsersInSearch = ({ users, onClick }) => {
  return (
    <div className={style.usersInSearch}>
      <ul className={style.usersInSearchItems}>
        {users.map((user) =>
          <UserInSearch
            key={user.id}
            user={user}
            onClick={onClick}
          />)}
      </ul>
    </div>
  )
}
