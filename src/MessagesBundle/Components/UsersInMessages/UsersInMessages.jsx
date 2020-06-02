import React from 'react';

//style
import style from './usersInMessages.module.css';
//Components
import { UserInSearch } from '../UsersInSearch/UserInSearch/UserInSearch';

export const UsersInMessages = ({ userAdmin, users, handleAcceptUser }) => {

  return (
    <div className={style.usersInMessages}>
      <ul>
        {users.map((user, index) => {
          const room = userAdmin.social.roomIds.find((roomId) => roomId.id === user.social.roomIds[index].id)
          return (
            <UserInSearch
              key={user.id}
              user={user}
              userAdmin={userAdmin}
              onClick={null}
              isLink={true}
              handleAcceptUser={handleAcceptUser}
              room={room}
            />
          )
        })}
      </ul>
    </div>
  )
}
