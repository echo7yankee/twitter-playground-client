import React from 'react';

//style
import style from './profileOverlayImage.module.css';
import { ProfileImg } from '../../../GlobalComponents/ProfileImg/ProfileImg';

export const ProfileOverlayImage = ({ user, setShowOverlayImage }) => {
  return (
    <div
      className='overlay overlay-alpha-brown'
      onClick={() => setShowOverlayImage(false)}>
      <div
        className={style.profileOverlayImageContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <ProfileImg user={user} />
      </div>
    </div>
  )
}
