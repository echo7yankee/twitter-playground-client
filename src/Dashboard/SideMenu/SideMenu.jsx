import React, { useEffect, useState } from 'react';
import { config } from '../../utils/constants/Environment';
import spinner from '../../assets/gifs/spinner.gif';
//style
import style from './sideMenu.module.css';
import { IoMdHome, IoIosPerson, IoMdNotificationsOutline } from 'react-icons/io';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails } from '../../Redux/actions/user/user';
import { getNotifications, updateNotifications, resetNotifications } from '../../Redux/actions/notification/notification';

//react router dom
import { NavLink } from 'react-router-dom';
import { userIdFromToken } from '../../utils/services/userIdFromToken';

export const SideMenu = () => {
  const { url } = config;
  const ownerProfileImg = localStorage.getItem('ownerProfileImg');
  //use State
  const [profileImg, setProfileImg] = useState('');
  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  const notifications = useSelector((state) => state.notification.notifications);
  const notificationsLength = useSelector((state) => state.notification.notificationsLength);
  const isLoading = useSelector((state) => state.notification.isLoading);
  const userFollows = user.social && user.social.following

  // TODO: FINISH NOTIFICATION SYSTEM, RESET TO NONE WHEN CLICKING THE NOTIFICATION AND 
  // RESTART WHEN ADDING NEW NOTIFICATION AGAIN (MIGHT NEED EVERY OR UPDATE MANY HERE)


  useEffect(() => {
    let notificationsInterval;
    if (ownerProfileImg === 'null') {
      dispatch(getUserDetails(userIdFromToken()));
    }
    if (userFollows && userFollows.length) {
      dispatch(getNotifications({ userId: userFollows }));
      notificationsInterval = setTimeout(() => {
        dispatch(getNotifications({ userId: userFollows }));
      }, 30000);
    }

    return () => {
      dispatch(resetNotifications());
      window.clearInterval(notificationsInterval);
    }

  }, [dispatch, ownerProfileImg, userFollows])

  const setNotificationsOnFlase = () => {
    dispatch(updateNotifications({ userId: userFollows }, { notificationState: false }))
  }

  useEffect(() => {
    setProfileImg(ownerProfileImg !== 'null' ? ownerProfileImg : user.profileImg)
  }, [ownerProfileImg, user.profileImg])

  console.log(notificationsLength);

  return (
    <div className={style.menuContainer}>
      <ul className={style.menuItems}>
        <li className={style.menuItem}>
          <NavLink to='/dashboard/' exact={true} activeClassName={style.isActive}>
            <IoMdHome />
            <span>Home</span>
          </NavLink>
        </li>
        <li className={style.menuItem}>
          <NavLink
            to='/dashboard/notifications'
            activeClassName={style.isActive}
            onClick={setNotificationsOnFlase}
          >
            <div className='pos-relative '>
              <IoMdNotificationsOutline />
              {/* {isLoading
                ? <img src={spinner} className={style.menuNotificationSpinner} alt='spinner' />
                : !notificationsLength
                  ? null
                  : <span className={notificationsLength === 0 ? '' : style.menuNotificationLength}>
                    {notificationsLength > 0 && notificationsLength}
                  </span>
              } */}
              {notificationsLength > 0 && <span className={notificationsLength === 0 ? '' : style.menuNotificationLength}>
                {notificationsLength}
              </span>}
            </div>
            <span>Notifications</span>
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
