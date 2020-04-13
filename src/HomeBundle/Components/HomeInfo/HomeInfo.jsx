import React from 'react'

//style
import { IoIosSearch } from 'react-icons/io'
import { MdChatBubbleOutline } from 'react-icons/md';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import style from './homeinfo.module.css';

export const HomeInfo = () => {
  return (
    <div className={style.homeInfoContainer}>
      <ul className={style.homeInfoItems}>
        <li className={style.homeInfoItem}>
          <IoIosSearch />
          <span>Follow your interests.</span>
        </li>
        <li className={style.homeInfoItem}>
          <AiOutlineUsergroupDelete />
          <span>Hear what people are talking about.</span>
        </li>
        <li className={style.homeInfoItem}>
          <MdChatBubbleOutline />
          <span>Join the conversation.</span>
        </li>
      </ul>
    </div>
  )
}
