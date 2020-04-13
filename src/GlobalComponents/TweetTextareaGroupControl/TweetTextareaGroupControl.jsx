import React from 'react';

//style
import style from './tweetTextareaGroupControl.module.css';

//Components
import { InputTextArea } from '../Inputs/inputTextarea/inputTextarea';

export const TweetTextareaGroupControl = ({
  value,
  onChange,
  name,
  id,
  type,
  placeholder,
  wordCount,
  wordLimit,
  label
}) => {
  return (
    <>
      <div className={style.tweetTextareaGroupControl}>
        <div>
          <label htmlFor={name}>{label}</label>
          <InputTextArea
            value={value}
            onChange={onChange}
            name={name}
            id={id}
            type={type}
            placeholder={placeholder}
          />
        </div>
      </div>
      <div className='set-right mt-1'>
        <span>{wordCount}/{wordLimit}</span>
      </div>
    </>
  )
}
