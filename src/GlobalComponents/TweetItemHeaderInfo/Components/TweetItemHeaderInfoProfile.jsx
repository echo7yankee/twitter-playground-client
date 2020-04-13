import React from 'react'

//style
import { IoIosPerson } from 'react-icons/io';

export const TweetItemHeaderInfoProfile = ({ post }) => {
  return (
    <div>
      {post.profileImg === ''
        ? <IoIosPerson className='placeholder-profile-img' />
        : <div className="tweet-profile-img-container mr-1">
          <img
            className='tweet-profile-img align-self-start'
            src={`http://localhost:5000/image/${post.profileImg}`} alt="profile" />
        </div>
      }
    </div>
  )
}
