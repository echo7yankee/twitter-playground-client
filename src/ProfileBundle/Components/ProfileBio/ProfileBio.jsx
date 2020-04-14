import React from 'react';

//style
import style from './profileBio.module.css';
import { GoCalendar } from 'react-icons/go';

//Services
import { getUserCreatedDate } from '../../Services/getUserCreatedDate';

export const ProfileBio = ({ user }) => {
  return (
    <div className={style.profileBio}>
      <div className={style.profileBioInfo}>
        <div className={style.profileBioTitle}>
          <h1>{`${user.fName} ${user.lName}`}</h1>
        </div>
        <div className={style.profileBioDescription}>
          <p>{user.bio}</p>
        </div>
        <div className={style.profileBioJoined}>
          <GoCalendar />
          <span>
            Joined {getUserCreatedDate(user.createdAt).month}
            {' '}{getUserCreatedDate(user.createdAt).year}
          </span>
        </div>
        <div className={style.profileBioFollow}>
          <span>
            <b className='mr-05'>{user.social.followingCount}</b> Following
          </span>
          <span>
            <b className='mr-05'>{user.social.followersCount}</b> Followers
        </span>
        </div>
      </div>
    </div>
  )
}
