import React from 'react';
//react-router-dom
import { NavLink } from 'react-router-dom';
//style
import style from './notificationsMenu.module.css';

export const NotificationsMenu = () => {
  return (
    <div className={style.notificationsMenu}>
      <div className={style.notificationsMenuItem}>
        <NavLink
          to='/dashboard/notifications'
          activeClassName={style.activeLink}
          exact={true}
        >
          All
          </NavLink >
      </div>
      <div className={style.notificationsMenuItem}>
        <NavLink
          to='/dashboard/notifications/mentions'
          activeClassName={style.activeLink}
        >
          Mentions
          </NavLink >
      </div>
    </div>
  )
}
