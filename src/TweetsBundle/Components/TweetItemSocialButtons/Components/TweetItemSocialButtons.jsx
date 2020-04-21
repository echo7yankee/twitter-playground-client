import React from 'react';
//style
import style from './tweetItemSocialButtons.module.css';
import { FaRegHeart, FaHeart, FaRegComment } from 'react-icons/fa';
import { getPersonWhoLiked } from '../Services/getPersonWhoLiked';

export const TweetItemSocialButtons = ({ postObj, user, setTogglePostReply, handleLikePost }) => {
  const likes = postObj.whoLiked.length;
  const postReplies = postObj.postComments.length;

  return (
    <div className="dflex">
      <div className='dflex'>
        {getPersonWhoLiked(postObj, user) === user.id
          ? <FaHeart
            className={`${style.tweetIcon} ${style.tweetItemHeartIcon} svg-fill-red`}
            onClick={handleLikePost} />
          : <FaRegHeart
            className={`${style.tweetIcon} ${style.tweetItemHeartIcon} ${style.tweetIconOutline}`}
            onClick={handleLikePost} />}
        <span className={style.tweetItemCount}>{likes === 0 ? null : likes}</span>
      </div>
      <div className="dflex">
        <FaRegComment
          className={`${style.tweetIcon} ${style.tweetIconOutline}`}
          onClick={() => {
            if (!postObj.postComments.length) return;
            setTogglePostReply((prevState) => !prevState)
          }}
        />
        <span className={style.tweetItemCount}>{postReplies === 0 ? null : postReplies}</span>
      </div>
    </div>
  )
}
