import React from 'react';

//unique id
import uuidv4 from 'uuid/v4';

//icons
import { TiVolumeMute } from 'react-icons/ti';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';

const volumeMuteIcon = <TiVolumeMute />;
const trashIcon = <FaRegTrashAlt />;
const editIcon = <MdModeEdit />;


export default (post, userId, action) => {
  return [{
    name: post.userId === userId ? 'Remove Tweet' : null,
    icon: trashIcon,
    action: action.remove,
    id: uuidv4(),
  }, {
    name: post.userId !== userId && `Mute ${post.username}`,
    icon: volumeMuteIcon,
    id: uuidv4(),
  },
  {
    name: post.userId === userId && `Edit Post`,
    icon: editIcon,
    action: action.edit,
    id: uuidv4(),
  }]
}
