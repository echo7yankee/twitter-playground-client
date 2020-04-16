import React from 'react';
import { config } from '../../../utils/constants/Environment';
//style
import style from './notificationItem.module.css';
import { IoIosStar } from 'react-icons/io';

export const NotificationItem = ({ post }) => {

  // TODO: ADD LINK TOWARDS SINGLE POST WHEN CLICKING ON POST
  // TODO: ADD LINK TOWARDS USER WHEN CLICKING ON PHOTO
  // TODO: ADD DROPDOWN
  // TODO: ADD POSTS LENGTH IN THE NOTIFICATION ICON IN SIDE MENU
  // TODO: ADD DEFAULT PROFILE ICON IF THERE'S NO PROFILE IMG

  const { url } = config;
  return (
    <div className={style.notificationItem}>
      <div className={style.notificationItemIcon}>
        <IoIosStar />
      </div>
      <div className={style.notificationItemImage}>
        <img src={`${url.API_URL}image/${post.profileImg}`} alt="" />
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
