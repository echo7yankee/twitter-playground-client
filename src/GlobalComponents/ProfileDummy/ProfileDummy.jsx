import React from 'react'
//style
import style from './profileDummy.module.css'

export const ProfileDummy = () => {
  return (
    <div className={style.profileDummy}>
      <div className={`${style.profileDummyCover} ${style.profileDummyItem}`} />
      <div className={style.profileDummyItems}>
        <div className={style.profileDummyHeader}>
          <div className={`${style.profileDummyImg} ${style.profileDummyItem}`} />
          <div className={`${style.profileDummyButton} ${style.profileDummyItem}`} />
        </div>
        <div className={style.profileDummyInfo}>
          <div className={`${style.profileDummyName} ${style.profileDummyItem}`} />
          <div className={`${style.profileDummyBio} ${style.profileDummyItem}`} />
          <div className={`${style.profileDummyCreatedAt} ${style.profileDummyItem}`} />
          <div className={style.profileDummySocial}>
            <div className='dflex'>
              <div className={`${style.profileDummyFollowingNumber} ${style.profileDummyItem}`} />
              <div className={`${style.profileDummyFollowingText} ${style.profileDummyItem}`} />
            </div>
            <div className='dflex ml-1'>
              <div className={`${style.profileDummyFollowersNumber} ${style.profileDummyItem}`} />
              <div className={`${style.profileDummyFollowersText} ${style.profileDummyItem}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
