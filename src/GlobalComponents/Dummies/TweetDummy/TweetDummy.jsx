import React from 'react';
//style
import style from './tweetDummy.module.css';

export const TweetDummy = () => {
  return (
    <div className={style.tweetDummy}>
      <div className={style.tweetDummyHeader}>
        <div className={style.tweetDummyHeaderLeft}>
          <div className={`${style.tweetDummyImg} ${style.tweetDummyItem}`} />
          <div className={`${style.tweetDummyName} ${style.tweetDummyItem}`} />
        </div>
        <div className={`${style.tweetDummyArrow} ${style.tweetDummyItem}`} />
      </div>
      <div className={`${style.tweetDummyComment} ${style.tweetDummyItem}`} />
      <div className={style.tweetDummyBottom}>
        <div className='dflex'>
          <div className={`${style.tweetDummySocialButtons} ${style.tweetDummyItem}`} />
          <div className={`${style.tweetDummySocialButtons} ${style.tweetDummyItem}`} />
        </div>
        <div className={`${style.tweetDummyReplyButton} ${style.tweetDummyItem}`} />
      </div>
    </div>
  )
}
