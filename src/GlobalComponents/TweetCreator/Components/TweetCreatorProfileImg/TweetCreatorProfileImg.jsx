import React from 'react'

//style
import { IoIosPerson } from 'react-icons/io'

export const TweetCreatorProfileImg = ({ user }) => {
  return (
    user.profileImg === ''
      ? <IoIosPerson className='placeholder-profile-img' />
      : <div className='tweet-profile-img-container mr-1'>
        <img
          className='tweet-profile-img align-self-start '
          src={`http://localhost:5000/image/${user.profileImg}`} alt="profile" />
      </div>
  )
}
