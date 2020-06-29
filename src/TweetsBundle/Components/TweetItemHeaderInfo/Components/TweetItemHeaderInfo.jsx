import React, { useRef } from 'react';
import ContentEditable from 'react-contenteditable';

//utils/services/constants
import { filterDropdownItems } from '../Services/filterDropdownItems'
import { customLinkHistory } from '../../../../utils/services/customLinkHistory'
import { pushToProfilePage } from '../../../../utils/services/pushToProfilePage'
//moment
import moment from "moment";
//style
import style from './tweetItemHeaderInfo.module.css';
import { IoIosArrowDown } from 'react-icons/io';
//Components
import { DropdownItems } from '../../../../GlobalComponents/Dropdown/DropdownItems';
import { useOutsideClose } from '../../../../GlobalComponents/CloseDropdown/CloseDropdown';

export const TweetItemHeaderInfo = ({
  postObj,
  isDropdown,
  closeDropdown,
  openDropdown,
  user,
  users,
  action,
  history,
  isSingleTweet
}) => {

  //date 
  const fromNowDate = moment(postObj.createdAt).fromNow();
  const postMonth = new Date(postObj.createdAt).toDateString().split(" ")[1];
  const postDay = new Date(postObj.createdAt).toDateString().split(" ")[2];

  const wrapperRef = useRef(null);
  useOutsideClose(wrapperRef, closeDropdown);

  return (
    <div>
      <div className={style.tweetItemHeaderContainer}>
        <div
          className='dflex'
        >
          <div>
            <h3 onClick={(e) => {
              e.preventDefault();
              customLinkHistory(() => pushToProfilePage(history, postObj, user));
            }}>{postObj.username}</h3>
          </div>
          <span className='ml-05'>-</span>
          <span className='ml-05'>{fromNowDate}</span>
          <span className='ml-05'>{`${postDay} ${postMonth}`}</span>
        </div>
        {!isSingleTweet
          && <div
            ref={wrapperRef}
            className='pos-relative'
            onClick={(e) => {
              e.preventDefault()
              openDropdown()
            }}>
            <IoIosArrowDown className={isDropdown ? 'rotate-0' : 'rotate-90'} />
            <DropdownItems
              isDropdown={isDropdown}
              closeDropdown={closeDropdown}
              dropdownItems={filterDropdownItems(postObj, user.id, action)}
            />
          </div>
        }
      </div>
      <ContentEditable
        className={style.tweetItemContent}
        html={postObj.comment}
      />
    </div>
  )
}
