import React from 'react';

//style
import { IoIosPerson } from 'react-icons/io';

export const ProfileImg = ({ user }) => {
  return (
    user.profileImg
      ? <img src={`http://localhost:5000/image/${user.profileImg}`} alt='profile' />
      : <IoIosPerson />
  )
}
