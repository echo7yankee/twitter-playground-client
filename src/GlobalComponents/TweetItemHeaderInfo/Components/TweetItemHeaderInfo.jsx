import React, { useRef } from 'react';

//utils
import tweetItemDropdownArr from '../Services/getTweetItemDropdownArr'

//moment
import moment from "moment";

//style
import style from './tweetItemHeaderInfo.module.css';
import { IoIosArrowDown } from 'react-icons/io';

//Components
import { DropdownItems } from '../../Dropdown/DropdownItems';
import { useOutsideClose } from '../../CloseDropdown/CloseDropdown';

export const TweetItemHeaderInfo = ({ post, isDropdown, closeDropdown, openDropdown, user, action }) => {

  //date 
  const fromNowDate = moment(post.createdAt).fromNow();
  const postMonth = new Date(post.createdAt).toDateString().split(" ")[1];
  const postDay = new Date(post.createdAt).toDateString().split(" ")[2];

  const wrapperRef = useRef(null);
  useOutsideClose(wrapperRef, closeDropdown);

  return (
    <div>
      <div className={style.tweetItemHeaderContainer}>
        <div className='dflex'>
          <h3>{post.username}</h3>
          <span className='ml-05'>-</span>
          <span className='ml-05'>{fromNowDate}</span>
          <span className='ml-05'>{`${postDay} ${postMonth}`}</span>
        </div>
        <div ref={wrapperRef} className='pos-relative' onClick={openDropdown}>
          <IoIosArrowDown className={isDropdown ? 'rotate-0' : 'rotate-90'} />
          <DropdownItems
            isDropdown={isDropdown}
            closeDropdown={closeDropdown}
            dropdownItems={tweetItemDropdownArr(post, user.id, action)}
          />
        </div>
      </div>
      <div dangerouslySetInnerHTML={{
        __html:
          post.comment
      }}>
      </div>
    </div>
  )
}
