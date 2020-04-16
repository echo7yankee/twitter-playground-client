import React, { useState, useRef } from 'react';
import { config } from '../../../utils/constants/Environment';
//services
import { getNotificationDropdownItems } from '../../Services/getNotificationDropdownItems';
//style
import style from './notificationItem.module.css';
import { IoIosStar, IoIosArrowDown, IoIosPerson } from 'react-icons/io';
import { DropdownItems } from '../../../GlobalComponents/Dropdown/DropdownItems';
import { useOutsideClose } from '../../../GlobalComponents/CloseDropdown/CloseDropdown';

export const NotificationItem = ({ post }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // TODO: ADD LINK TOWARDS SINGLE POST WHEN CLICKING ON POST
  // TODO: ADD LINK TOWARDS USER WHEN CLICKING ON PHOTO
  // TODO: ADD POSTS LENGTH IN THE NOTIFICATION ICON IN SIDE MENU

  const wrapperRef = useRef(null);
  useOutsideClose(wrapperRef, () => setShowDropdown(false));

  const { url } = config;
  return (
    <div className={style.notificationItem}>
      <div className={style.notificationItemIcon}>
        <IoIosStar />
      </div>
      <div className={style.notificationItemImage}>
        {post.profileImg
          ? <img src={`${url.API_URL}image/${post.profileImg}`} alt="" />
          : <IoIosPerson className='placeholder-profile-img' />
        }
      </div>
      <div
        ref={wrapperRef}
        className={style.notificationItemDropdownIcon}
        onClick={() => setShowDropdown((prevState) => !prevState)} >
        <IoIosArrowDown className={showDropdown ? 'rotate-0' : 'rotate-90'} />
        <DropdownItems dropdownItems={getNotificationDropdownItems()} isDropdown={showDropdown} />
      </div>
      <div className={style.notificationItemSubtitle}>
        <span>Recent Tweet from <b>{post.username}</b></span>
      </div>
      <div
        className={style.notificationItemContent}
        dangerouslySetInnerHTML={{
          __html: post.comment
        }}
      ></div>
    </div>
  )
}
