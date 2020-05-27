import React from 'react';

//style
import style from './usersInMessages.module.css';
//Components
import { UserInSearch } from '../UsersInSearch/UserInSearch/UserInSearch';

export const UsersInMessages = ({ userAdmin, users, handleAcceptUser }) => {

  return (
    <div>
      <ul>
        {users.map((user) => {
          return (
            <UserInSearch
              key={user.id}
              user={user}
              userAdmin={userAdmin}
              onClick={null}
              isLink={true}
              handleAcceptUser={handleAcceptUser}
            />
          )
        })}
      </ul>
    </div>
  )
}
