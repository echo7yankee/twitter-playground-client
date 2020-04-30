import React from 'react';
//style
import style from './notificationDummy.module.css';

export const NotificationDummy = () => {
  return (
    <div className={style.notificationDummy}>
      <div className={`${style.notificationDummyIcon} ${style.notificationDummyItem}`} />
      <div className={style.notificationDummyRight}>
        <div>
          <div className={`${style.notificationDummyImg} ${style.notificationDummyItem}`} />
          <div className={`${style.notificationDummyNote} ${style.notificationDummyItem}`} />
          <div className={`${style.notificationDummyComment} ${style.notificationDummyItem}`} />
        </div>
        <div className={`${style.notificationDummyArrow} ${style.notificationDummyItem}`} />
      </div>
    </div>
  )
}
