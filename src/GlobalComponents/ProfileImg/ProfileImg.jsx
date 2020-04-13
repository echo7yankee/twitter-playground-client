import React from 'react';
import { config } from '../../utils/constants/Environment';

//style
import { IoIosPerson } from 'react-icons/io';

export const ProfileImg = ({ user }) => {
  const { url } = config;
  return (
    user.profileImg
      ? <img src={`${url.API_URL}/image/${user.profileImg}`} alt='profile' />
      : <IoIosPerson />
  )
}
