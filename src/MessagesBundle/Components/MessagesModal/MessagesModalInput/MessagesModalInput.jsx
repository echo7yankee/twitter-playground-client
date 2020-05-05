import React from 'react'
//style
import style from './messagesModalInput.module.css';
import { RiSearchLine } from 'react-icons/ri';

export const MessagesModalInput = ({ type, placeholder, name, value, onChange }) => {
  return (
    <div className={style.messageModalInput}>
      <RiSearchLine />
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
