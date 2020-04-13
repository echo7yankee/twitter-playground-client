import React from 'react';

//style
import style from './profileImage.module.css';
import { ProfileImg } from '../../../GlobalComponents/ProfileImg/ProfileImg';

export const ProfileImage = ({ user, setShowOverlayImage }) => {
  return (
    <div className={style.profileImageContainer} onClick={() => setShowOverlayImage(true)}>
      <ProfileImg user={user} />
    </div>
  )
}
