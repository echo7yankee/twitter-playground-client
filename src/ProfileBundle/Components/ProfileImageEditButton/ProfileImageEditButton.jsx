import React, { useState } from 'react';
import { getFollowButtonState } from '../../../utils/services/getFollowButtonState';

//style
import style from './profileImageEditButton.module.css';

export const ProfileImageEditButton = ({ openModal, handleFollowUser, state, user }) => {

  const [buttonText, setButtonText] = useState(false);

  return (
    <button
      className={state.isOwner !== null
        && getFollowButtonState(state.ownerId, user)
        ? style.profileImageEditButtonFollowed
        : style.profileImageEditButton}
      onClick={state.isOwner === null
        ? openModal
        : () => handleFollowUser(state.ownerId, user.id)}
      onMouseEnter={() => setButtonText(getFollowButtonState(state.ownerId, user) && true)}
      onMouseLeave={() => setButtonText(getFollowButtonState(state.ownerId, user) && false)}
    >
      {state.isOwner === null
        ? 'Edit Profile'
        : buttonText
          ? 'Unfollow' :
          getFollowButtonState(state.ownerId, user)
            ? 'Following'
            : 'Follow'}
    </button>
  )
}
