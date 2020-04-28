import React from 'react'
import { config } from '../../../utils/constants/Environment';

//style
import { IoIosPerson } from 'react-icons/io'

export const TweetProfileImg = ({ profileImg, classNameDiv, classNameIcon, onMouseOver }) => {
  const { url } = config;

  return (
    profileImg === ''
      ? <IoIosPerson
        className={classNameIcon}
        onMouseOver={onMouseOver}
      />
      : <div
        className={classNameDiv}
        onMouseOver={onMouseOver}
      >
        <img
          className='tweet-profile-img align-self-start '
          src={`${url.API_URL}image/${profileImg}`} alt="profile" />
      </div>
  )
}
