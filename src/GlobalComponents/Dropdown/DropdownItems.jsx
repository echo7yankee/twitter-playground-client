import React from 'react';

//style
import style from './dropdown.module.css';

//components
import { DropdownItem } from './DropdownItem';

export const DropdownItems = ({ isDropdown, dropdownItems, closeDropdown }) => {

  return (
    <div className={isDropdown ? style.DropdownShow : style.Dropdown}>
      <ul className={style.DropdownItems}>
        {dropdownItems.map(item => {
          return <DropdownItem key={item.id && item.id} item={item} />
        })}
      </ul>
    </div>
  )
}
