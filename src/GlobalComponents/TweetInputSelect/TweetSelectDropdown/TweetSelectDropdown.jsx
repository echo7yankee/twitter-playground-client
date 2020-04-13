import React from 'react';

//style
import style from './tweetSelectDropdown.module.css';

export const TweetSelectDropdown = ({
  array,
  isDropdown,
  setIsDropdown,
  type,
  onChange }) => {

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className={isDropdown
        ? style.tweetSelectDropdownShow
        : style.tweetSelectDropdown}>
        <ul className={style.tweetSelectDropdownItems}>
          {array.map((item) => {
            return <li key={item} onClick={() => {
              onChange(type, item);
              setIsDropdown(false);
            }
            } >{item}</li>
          })}
        </ul>
      </div>
    </div>
  )
}
