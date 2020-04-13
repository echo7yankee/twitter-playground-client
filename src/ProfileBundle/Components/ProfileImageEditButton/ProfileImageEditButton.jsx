import React from 'react';

//style
import style from './profileImageEditButton.module.css';

export const ProfileImageEditButton = ({ openModal, isOwner }) => {
  return (
    <button
      className={style.profileImageEditButton}
      onClick={isOwner === null ? openModal : null}>
      {isOwner === null ? 'Edit Profile' : 'Follow'}
    </button>
  )
}
