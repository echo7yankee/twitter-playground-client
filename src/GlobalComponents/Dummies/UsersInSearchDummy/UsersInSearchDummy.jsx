import React from 'react';
//style
import style from './usersInSearchDummy.module.css';

export const UsersInSearchDummy = () => {
  return (
    <div className={style.usersInSearchDummy}>
      <div className={`${style.usersInSearchDummyImg} ${style.usersInSearchDummyItem}`} />
      <div className={`${style.usersInSearchDummyText} ${style.usersInSearchDummyItem}`} />
    </div>
  )
}
