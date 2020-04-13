import React from 'react';

//style
import style from './tweetInputGroupControl.module.css';

//Components
import { InputText } from '../Inputs/InputText/InputText';

export const TweetInputGroupControl = ({
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
      <div className={style.tweetInputGroupControl}>
        <div>
          <label htmlFor={name}>{label}</label>
          <InputText
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
