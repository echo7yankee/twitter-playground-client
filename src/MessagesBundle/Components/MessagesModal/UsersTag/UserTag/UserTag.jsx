import React from 'react';
//style
import style from './userTag.module.css';
import { IoMdClose } from 'react-icons/io';

export const UserTag = ({ newUser, onClick }) => {
  return (
    <li className={style.userTagItem}>
      <span>{newUser.username}</span>
      <IoMdClose onClick={() => onClick(newUser.id)} />
    </li>
  )
}
