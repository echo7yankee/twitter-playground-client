import React, { useState, useRef } from 'react';
import { config } from '../../../utils/constants/Environment';
import ContentEditable from 'react-contenteditable';
//services
import { getNotificationDropdownItems } from '../../Services/getNotificationDropdownItems';
//style
import style from './notificationItem.module.css';
import { IoIosStar, IoIosArrowDown, IoIosPerson } from 'react-icons/io';
import { DropdownItems } from '../../../GlobalComponents/Dropdown/DropdownItems';
import { useOutsideClose } from '../../../GlobalComponents/CloseDropdown/CloseDropdown';
import { CustomLink } from '../../../GlobalComponents/CustomLink/CustomLink';
import { customLinkHistory } from '../../../utils/services/customLinkHistory';
import { pushToProfilePage } from '../../../utils/services/pushToProfilePage';

export const NotificationItem = ({ history, post, user }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // TODO: ADD NOTIFICATION SYSTEM

  const linkRef = useRef(null);
  const wrapperRef = useRef(null);
  useOutsideClose(wrapperRef, () => setShowDropdown(false));

  const { url } = config;
  return (
    <CustomLink
      to={{
        pathname: `/dashboard/status/${post.id}`,
        state: post
      }}
      linkRef={linkRef}
      className={style.notificationItem}>
      <div className={style.notificationItemIcon}>
        <IoIosStar />
      </div>
      <div
        className={style.notificationItemImage}
        onClick={(e) => {
          e.preventDefault();
          customLinkHistory(() => pushToProfilePage(history, post, user));
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
          linkRef.current.focus();
        }}>
        <IoIosArrowDown
          className={showDropdown ? 'rotate-0' : 'rotate-90'} />
        <DropdownItems
          dropdownItems={getNotificationDropdownItems()}
          isDropdown={showDropdown} />
      </div>
      <div className={style.notificationItemSubtitle}>
        <span>Recent Tweet from <b>{post.username}</b></span>
      </div>
      <ContentEditable
        className={style.notificationItemContent}
        html={post.comment}
      />
    </CustomLink>
  )
}
