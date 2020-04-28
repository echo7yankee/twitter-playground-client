import React from 'react';
import uuidv4 from 'uuid/v4';
import { IoMdSad } from 'react-icons/io';

export const getNotificationDropdownItems = () => {
  const sadIcon = <IoMdSad />

  return [{
    name: 'See less',
    icon: sadIcon,
    action: null,
    id: uuidv4(),
  }]
}
