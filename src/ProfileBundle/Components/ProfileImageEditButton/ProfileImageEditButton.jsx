import React from 'react';

//style
import style from './profileImageEditButton.module.css';

export const ProfileImageEditButton = ({ openModal }) => {
  return (
    <button className={style.profileImageEditButton} onClick={openModal}>
      Edit Profile
    </button>
  )
}
