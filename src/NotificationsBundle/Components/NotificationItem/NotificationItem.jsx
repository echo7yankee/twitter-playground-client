import React, { useState, useRef } from 'react';
import { config } from '../../../utils/constants/Environment';
import ContentEditable from 'react-contenteditable';
//react router dom
import { Link } from 'react-router-dom';
//services
import { getNotificationDropdownItems } from '../../Services/getNotificationDropdownItems';
//style
import style from './notificationItem.module.css';
import { IoIosStar, IoIosArrowDown, IoIosPerson } from 'react-icons/io';
import { DropdownItems } from '../../../GlobalComponents/Dropdown/DropdownItems';
import { useOutsideClose } from '../../../GlobalComponents/CloseDropdown/CloseDropdown';

export const NotificationItem = ({ history, post, user }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // TODO: ADD LINK TOWARDS SINGLE POST WHEN CLICKING ON POST
  // TODO: ADD LINK TOWARDS USER WHEN CLICKING ON PHOTO
  // TODO: ADD NOTIFICATION SYSTEM

  const wrapperRef = useRef(null);
  useOutsideClose(wrapperRef, () => setShowDropdown(false));

  const { url } = config;
  return (
    <Link
      to={{
        pathname: `/dashboard/status/${post.id}`,
        state: post
      }}
      className={style.notificationItem}>
      <div className={style.notificationItemIcon}>
        <IoIosStar />
      </div>
      <div
        className={style.notificationItemImage}
        onClick={(e) => {
          e.preventDefault();
          history.push({
            pathname: `/dashboard/user/${post.username.split(' ').join('')}`,
            state: {
              userId: post.userId,
              owner: {
                ownerId: user.id,
                isOwner: post.userId === user.id ? null : false,
              }
            }
          })
        }}
      >
        {post.profileImg
          ? <img src={`${url.API_URL}image/${post.profileImg}`} alt="" />
          : <IoIosPerson className='placeholder-profile-img' />
        }
      </div>
      <div
        ref={wrapperRef}
        className={style.notificationItemDropdownIcon}
        onClick={(e) => {
          e.preventDefault();
          setShowDropdown((prevState) => !prevState)
        }}>
        <IoIosArrowDown className={showDropdown ? 'rotate-0' : 'rotate-90'} />
        <DropdownItems dropdownItems={getNotificationDropdownItems()} isDropdown={showDropdown} />
      </div>
      <div className={style.notificationItemSubtitle}>
        <span>Recent Tweet from <b>{post.username}</b></span>
      </div>
      <ContentEditable
        className={style.notificationItemContent}
        html={post.comment}
      />
    </Link>
  )
}
