import React from 'react';

//style
import style from "./dropdown.module.css";

export const DropdownItem = ({ item }) => {

  return item.name && <li className={style.DropdownItem} onClick={item.action}>
    <span>{item.icon}</span>
    <span className='ml-1'>{item.name}</span>
  </li>
}
