import React from 'react'
import { config } from '../../../../utils/constants/Environment';

//style
import { IoIosPerson } from 'react-icons/io';

export const TweetItemHeaderInfoProfile = ({ post }) => {
  const { url } = config;
  return (
    <div>
      {post.profileImg === ''
        ? <IoIosPerson className='placeholder-profile-img' />
        : <div className="tweet-profile-img-container mr-1">
          <img
            className='tweet-profile-img align-self-start'
            src={`${url.API_URL}image/${post.profileImg}`} alt="profile" />
        </div>
      }
    </div>
  )
}
