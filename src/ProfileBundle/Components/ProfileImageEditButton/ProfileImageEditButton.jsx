import React from 'react';
import { getFollowButtonState } from '../../../utils/services/getFollowButtonState';

//style
import style from './profileImageEditButton.module.css';

export const ProfileImageEditButton = ({ openModal, handleFollowUser, state, user }) => {
  return (
    <button
      className={style.profileImageEditButton}
      onClick={state.isOwner === null
        ? openModal
        : () => handleFollowUser(state.ownerId, user.id)}>
      {state.isOwner === null
        ? 'Edit Profile'
        : getFollowButtonState(state.ownerId, user) ? 'Unfollow' : 'Follow'}
    </button>
  )
}
