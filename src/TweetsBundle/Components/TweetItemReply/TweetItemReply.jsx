import React from 'react';
import moment from 'moment';

//style
import style from './tweetItemReply.module.css';
import { TweetProfileImg } from '../TweetProfileImg/TweetProfileImg';


export const TweetItemReply = ({ postComment, setConfirm, togglePostCommentEdit, user }) => {
  const fromNowDate = moment(postComment.createdAt).fromNow();
  const postMonth = new Date(postComment.createdAt).toDateString().split(" ")[1];
  const postDay = new Date(postComment.createdAt).toDateString().split(" ")[2];

  return (
    <div className={style.tweetItemReply}>
      <div className='dflex space-between ml-6'>
        <div className="dflex">
          <TweetProfileImg
            profileImg={postComment.profileImg}
            classNameIcon='placeholder-profile-img-reply'
            classNameDiv='tweet-profile-img-container-reply mr-1'
          />
          <div className={style.tweetItemReplyLeft}>
            <div className="dflex">
              <p>
                {postComment.username}
              </p>
              <p>
                <span className='ml-05 mr-05'>-</span>
                <span className='ml-05'>{fromNowDate}</span>
                <span className='ml-05'>{`${postDay} ${postMonth}`}</span>
              </p>
            </div>
            <p dangerouslySetInnerHTML={{
              __html:
                postComment.postComment
            }}>
            </p>
          </div>
        </div>
        {postComment.userId === user.id && <div className={style.tweetItemReplyBtns}>
          <button type='button' onClick={togglePostCommentEdit}>Edit</button>
          <button type='button' onClick={() => setConfirm((prevState) => ({
            ...prevState,
            item: postComment,
            action: !prevState.action
          }))}>Remove</button>
        </div>}
      </div>
    </div>
  )
}
