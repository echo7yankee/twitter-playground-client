import React from 'react';

//style
import style from './tweetItemsButtonsReply.module.css';

export const TweetItemsButtonsReply = ({ handleReplyButton, isReplyInput, cancelReply }) => {
  return (
    <div>
      <button
        className={style.tweetItemReplyButton}
        type='button'
        onClick={handleReplyButton}>
        Reply
                </button>
      {isReplyInput && <button
        type='button'
        onClick={cancelReply}
        className={style.tweetItemReplyButton}>Close</button>}
    </div>
  )
}
