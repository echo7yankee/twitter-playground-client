import React from 'react';
import { RiSearchLine } from 'react-icons/ri';

//style
import style from './globalSearch.module.css';

export const GlobalSearch = ({ type, placeholder, onChange, value, name }) => {
  return (
    <div className={style.globalSearch}>
      <RiSearchLine />
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
      />
    </div>
  )
}
