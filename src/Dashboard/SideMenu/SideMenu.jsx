import React, { useEffect, useState } from 'react';
import { config } from '../../utils/constants/Environment';
import spinner from '../../assets/gifs/spinner.gif';
//style
import style from './sideMenu.module.css';
import { IoMdHome, IoIosPerson } from 'react-icons/io';
import { MdEmail, MdNotifications } from 'react-icons/md';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails } from '../../Redux/actions/user/user';
import { getNotifications, updateNotifications, resetNotifications } from '../../Redux/actions/notification/notification';

//react router dom
import { NavLink } from 'react-router-dom';
import { userIdFromToken } from '../../utils/services/userIdFromToken';
import { getUserFollows } from '../../utils/services/getUserFollows';

export const SideMenu = () => {
  const { url } = config;
  const ownerProfileImg = localStorage.getItem('ownerProfileImg');
  //use State
  const [profileImg, setProfileImg] = useState('');
  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  // const notifications = useSelector((state) => state.notification.notifications);
  const notificationsLength = useSelector((state) => state.notification.notificationsLength);
  const isLoading = useSelector((state) => state.notification.isLoading);

  useEffect(() => {
    let notificationsInterval;
    if (ownerProfileImg === 'null') {
      dispatch(getUserDetails(userIdFromToken()));
    }
    if (getUserFollows(user) && getUserFollows(user).length) {
      dispatch(getNotifications({ userId: getUserFollows(user) }));
      notificationsInterval = setInterval(() => {
        dispatch(getNotifications({ userId: getUserFollows(user) }));
      }, 120000)
    }

    return () => {
      dispatch(resetNotifications());
      window.clearInterval(notificationsInterval);
    }

  }, [dispatch, ownerProfileImg, user])

  useEffect(() => {
    setProfileImg(ownerProfileImg !== 'null' ? ownerProfileImg : user.profileImg)
  }, [ownerProfileImg, user.profileImg])

  const setnotificationsOnFalse = () => {
    dispatch(updateNotifications({ userId: getUserFollows(user) }, { notificationState: false }))
  }

  // console.log('USER', user.id === userIdFromToken());
  // console.log('USER ID', user.id);
  // console.log('USER ID FROM TOKEN', userIdFromToken());

  return (
    <div className={style.menuContainer}>
      <ul className={style.menuItems}>
        <li className={style.menuItem}>
          <NavLink to='/dashboard/'
            exact={true}
            activeClassName={style.isActive}>
            <IoMdHome />
            <span>Home</span>
          </NavLink>
        </li>
        <li className={style.menuItem}>
          <NavLink
            to='/dashboard/notifications'
            activeClassName={style.isActive}
            onClick={setnotificationsOnFalse}
          >
            <div className='pos-relative '>
              <MdNotifications />
              {isLoading && notificationsLength
                ? <img src={spinner} className={style.menuNotificationSpinner} alt='spinner' />
                : notificationsLength > 0 && <span className={style.menuNotificationLength}>
                  {notificationsLength}
                </span>
              }
            </div>
            <span>Notifications</span>
          </NavLink>
        </li>
        <li className={style.menuItem}>
          <NavLink
            to='/dashboard/messages'
            activeClassName={style.isActive}
          >
            <div className='pos-relative '>
              <MdEmail />
            </div>
            <span>Messages</span>
          </NavLink>
        </li>
        <li className={style.menuItem}>
          <NavLink
            to='/dashboard/profile'
            activeClassName={style.isActive}>
            {
              profileImg === 'undefined' || profileImg === ''
                ? <IoIosPerson className='placeholder-profile-img' />
                : <div className='tweet-profile-img-container-menu mr-2'>
                  <img
                    className='tweet-profile-img align-self-start '
                    src={`${url.API_URL}image/${profileImg}`}
                    alt="profile" />
                </div>
            }
            <span>Profile</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
