import React, { useState, useRef } from 'react';

//style
import style from './tweetSelect.module.css';
import { IoIosArrowDown } from 'react-icons/io';

//Components
import { TweetSelectDropdown } from '../TweetSelectDropdown/TweetSelectDropdown';
import { useOutsideClose } from '../../CloseDropdown/CloseDropdown';

export const TweetSelect = ({
  label,
  value,
  styleTweetSelect,
  array,
  onChange,
  type,
}) => {

  const [isDropdown, setIsDropdown] = useState(false);

  const closeDropdown = () => {
    setIsDropdown(false);
  }

  //close dropdown
  const wrapperRef = useRef(null);
  useOutsideClose(wrapperRef, closeDropdown);

  return (
    <div
      ref={wrapperRef}
      style={styleTweetSelect}
      className={style.tweetSelect} >
      <label>{label}</label>
      <div
        className={style.tweetCreatorPollSelectValueContainer}
        onClick={() => setIsDropdown((prevState) => !prevState)}
      >
        <span>{value}</span>
        <IoIosArrowDown />
      </div>
      <TweetSelectDropdown
        array={array}
        isDropdown={isDropdown}
        setIsDropdown={setIsDropdown}
        type={type}
        onChange={onChange}
      />
    </div>
  )
}
