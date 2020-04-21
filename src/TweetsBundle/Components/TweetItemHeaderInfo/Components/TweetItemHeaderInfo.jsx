import React, { useRef } from 'react';
import ContentEditable from 'react-contenteditable';

//utils
import tweetItemDropdownArr from '../Services/getTweetItemDropdownArr'

//moment
import moment from "moment";

//style
import style from './tweetItemHeaderInfo.module.css';
import { IoIosArrowDown } from 'react-icons/io';

//Components
import { DropdownItems } from '../../../../GlobalComponents/Dropdown/DropdownItems';
import { useOutsideClose } from '../../../../GlobalComponents/CloseDropdown/CloseDropdown';
import { CustomLink } from '../../../../GlobalComponents/CustomLink/CustomLink';

export const TweetItemHeaderInfo = ({
  postObj,
  isDropdown,
  closeDropdown,
  openDropdown,
  user,
  action }) => {

  //date 
  const fromNowDate = moment(postObj.createdAt).fromNow();
  const postMonth = new Date(postObj.createdAt).toDateString().split(" ")[1];
  const postDay = new Date(postObj.createdAt).toDateString().split(" ")[2];

  const wrapperRef = useRef(null);
  useOutsideClose(wrapperRef, closeDropdown);

  return (
    <div>
      <div className={style.tweetItemHeaderContainer}>
        <div className='dflex'>
          <CustomLink
            to={{
              pathname: `/dashboard/user/${postObj.username.split(' ').join('')}`,
              state: {
                userId: postObj.userId,
                owner: {
                  ownerId: user.id,
                  isOwner: postObj.userId === user.id ? null : false,
                }
              }
            }}
          >
            <h3>{postObj.username}</h3>
          </CustomLink>
          <span className='ml-05'>-</span>
          <span className='ml-05'>{fromNowDate}</span>
          <span className='ml-05'>{`${postDay} ${postMonth}`}</span>
        </div>
        <div ref={wrapperRef} className='pos-relative' onClick={openDropdown}>
          <IoIosArrowDown className={isDropdown ? 'rotate-0' : 'rotate-90'} />
          <DropdownItems
            isDropdown={isDropdown}
            closeDropdown={closeDropdown}
            dropdownItems={tweetItemDropdownArr(postObj, user.id, action)}
          />
        </div>
      </div>
      <ContentEditable
        className={style.tweetItemContent}
        html={postObj.comment}
      />
    </div>
  )
}
