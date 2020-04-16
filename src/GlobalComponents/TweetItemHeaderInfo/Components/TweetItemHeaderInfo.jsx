import React, { useRef } from 'react';
import ContentEditable from 'react-contenteditable';
//react router dom
import { Link } from 'react-router-dom';

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

export const TweetItemHeaderInfo = ({
  post,
  isDropdown,
  closeDropdown,
  openDropdown,
  user,
  action }) => {

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
          <Link
            to={{
              pathname: `/dashboard/${post.userId}`,
              state: {
                owner: {
                  ownerId: user.id,
                  isOwner: post.userId === user.id ? null : false,
                }
              }
            }}
          >
            <h3>{post.username}</h3>
          </Link>
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
      <ContentEditable
        className={style.tweetItemContent}
        html={post.comment}
      />
    </div>
  )
}
