import React from 'react';

//unique id
import uuidv4 from 'uuid/v4';

//icons
import { TiVolumeMute } from 'react-icons/ti';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { getFollowButtonState } from '../../../../utils/services/getFollowButtonState';

export default (post, userId, action) => {

  const volumeMuteIcon = <TiVolumeMute />;
  const trashIcon = <FaRegTrashAlt />;
  const editIcon = <MdModeEdit />;
  const followUser = <AiOutlineUserAdd />

  return [{
    name: post.userId === userId ? 'Remove Tweet' : null,
    icon: trashIcon,
    action: action.remove,
    id: uuidv4(),
  }, {
    name: post.userId !== userId && `Mute @${post.username}`,
    icon: volumeMuteIcon,
    id: uuidv4(),
  },
  {
    name: post.userId === userId && `Edit Post`,
    icon: editIcon,
    action: action.edit,
    id: uuidv4(),
  },
  {
    name: post.userId === userId
      ? null
      : getFollowButtonState(userId, post.user)
        ? `Unfollow @${post.username}`
        : `Follow @${post.username}`,
    icon: followUser,
    action: action.follow,
    id: uuidv4(),
  }
  ]
}
