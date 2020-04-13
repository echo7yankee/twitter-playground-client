import React from 'react';
import moment from 'moment';

//style
import style from './tweetItemReply.module.css';
import { IoIosPerson } from 'react-icons/io'


export const TweetItemReply = ({ postReply, removeCommentFromPost, togglePostCommentEdit, user }) => {
  const fromNowDate = moment(postReply.createdAt).fromNow();
  const postMonth = new Date(postReply.createdAt).toDateString().split(" ")[1];
  const postDay = new Date(postReply.createdAt).toDateString().split(" ")[2];

  return (
    <div className={style.tweetItemReply}>
      <div className='dflex space-between ml-6'>
        <div className="dflex">
          {postReply.profileImg === ''
            ? <IoIosPerson className='placeholder-profile-img-reply' />
            : <div className='tweet-profile-img-container-reply  mr-1'>
              <img
                className='tweet-profile-img align-self-start '
                src={`http://localhost:5000/image/${postReply.profileImg}`} alt="profile" />
            </div>}
          <div className={style.tweetItemReplyLeft}>
            <div className="dflex">
              <p>
                {postReply.username}
              </p>
              <p>
                <span className='ml-05 mr-05'>-</span>
                <span className='ml-05'>{fromNowDate}</span>
                <span className='ml-05'>{`${postDay} ${postMonth}`}</span>
              </p>
            </div>
            <p dangerouslySetInnerHTML={{
              __html:
                postReply.postReply
            }}>
            </p>
          </div>
        </div>
        {postReply.userId === user.id && <div className={style.tweetItemReplyBtns}>
          <button type='button' onClick={togglePostCommentEdit}>Edit</button>
          <button type='button' onClick={removeCommentFromPost}>Remove</button>
        </div>}
      </div>
    </div>
  )
}
