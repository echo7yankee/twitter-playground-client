import React from 'react';
//style
import style from './chatForm.module.css';
import { MdGif, MdInsertEmoticon, MdSend } from 'react-icons/md';
import { AiOutlinePicture } from 'react-icons/ai';

export const ChatForm = ({ onSubmit, onChange, value, type, placeholder }) => {
  return (
    <div className={style.chatFormContainer}>
      <div className={style.chatFormContainerLeft}>
        <AiOutlinePicture />
        <MdGif />
      </div>
      <form
        onSubmit={onSubmit}
        className={style.chatForm}>
        <div>
          <input
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          />
          <MdInsertEmoticon />
        </div>
        <button>
          <MdSend />
        </button>
      </form>
    </div>
  )
}
