import React from 'react';
import { getFollowButtonState } from '../../../utils/services/getFollowButtonState';

//style
import style from './profileImageEditButton.module.css';

export const ProfileImageEditButton = ({ openModal, handleFollowUser, state, user }) => {
  return (
    <button
      className={style.profileImageEditButton}
      style={state.isOwner !== null && getFollowButtonState(state.ownerId, user)
        ? { backgroundColor: '#1da1f2', color: '#ffffff' } : {}}
      onClick={state.isOwner === null
        ? openModal
        : () => handleFollowUser(state.ownerId, user.id)}>
      {state.isOwner === null
        ? 'Edit Profile'
        : getFollowButtonState(state.ownerId, user) ? 'Following' : 'Follow'}
    </button>
  )
}
