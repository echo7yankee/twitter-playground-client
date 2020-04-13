import React from 'react';

//redux
import { useDispatch } from 'react-redux';
import {
  likePost,
} from '../../../Redux/actions/post/post';

//style
import style from './tweetItemSocialButtons.module.css';
import { FaRegHeart, FaHeart, FaRegComment } from 'react-icons/fa';
import { getPersonWhoLiked } from '../Services/getPersonWhoLiked';

export const TweetItemSocialButtons = ({ post, user, setTogglePostReply }) => {

  //redux
  const dispatch = useDispatch();


  const likes = post.whoLiked.length;
  const postReplies = post.postComments.length;

  return (
    <div className="dflex">
      <div className='dflex'>
        {getPersonWhoLiked(post, user) !== user.id
          ? <FaRegHeart
            className={`${style.tweetIcon} ${style.tweetItemHeartIcon} ${style.tweetIconOutline}`}
            onClick={() => dispatch(likePost(post.id, user.id))} />
          : <FaHeart
            className={`${style.tweetIcon} ${style.tweetItemHeartIcon} svg-fill-red`}
            onClick={() => dispatch(likePost(post.id, user.id))} />}
        <span className={style.tweetItemCount}>{likes === 0 ? null : likes}</span>
      </div>
      <div className="dflex">
        <FaRegComment
          className={`${style.tweetIcon} ${style.tweetIconOutline}`}
          onClick={() => {
            if (!post.postComments.length) return;
            setTogglePostReply((prevState) => !prevState)
          }}
        />
        <span className={style.tweetItemCount}>{postReplies === 0 ? null : postReplies}</span>
      </div>
    </div>
  )
}
