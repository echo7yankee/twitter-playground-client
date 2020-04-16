import React from 'react'
import { config } from '../../../../../utils/constants/Environment';

//style
import { IoIosPerson } from 'react-icons/io'

export const TweetCreatorProfileImg = ({ user }) => {

  const { url } = config;

  return (
    user.profileImg === ''
      ? <IoIosPerson className='placeholder-profile-img' />
      : <div className='tweet-profile-img-container mr-1'>
        <img
          className='tweet-profile-img align-self-start '
          src={`${url.API_URL}image/${user.profileImg}`} alt="profile" />
      </div>
  )
}
