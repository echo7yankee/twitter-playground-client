import React from 'react';

//style
import style from './usersInMessages.module.css';
//Components
import { UserInSearch } from '../UsersInSearch/UserInSearch/UserInSearch';

export const UsersInMessages = ({ userAdmin, users, handleAcceptUser, cancelAcceptUser }) => {
  return (
    <div className={style.usersInMessages}>
      <ul>
        {users.map((user, index) => {
          const room = userAdmin.social.roomIds.find((room) => {
            return user.social.roomId?.hasAccepted === null
              ? room.id === user.social.roomId.id
              : room.id === userAdmin.social.roomIds[index].id
          })
          return (
            <UserInSearch
              key={user.id}
              user={user}
              userAdmin={userAdmin}
              onClick={null}
              isLink={true}
              handleAcceptUser={() => handleAcceptUser(room)}
              cancelAcceptUser={() => cancelAcceptUser(user.id, room.id)}
              room={room}
            />
          )
        })}
      </ul>
    </div>
  )
}
