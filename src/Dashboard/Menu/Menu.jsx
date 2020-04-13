import React from 'react';
//style
import style from './menu.module.css';
import { IoMdHome, IoIosPerson } from 'react-icons/io';

//redux
import { useSelector } from 'react-redux';

//react router dom
import { NavLink } from 'react-router-dom';

export const Menu = () => {
  const user = useSelector(state => state.user.userDetails);

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
          <NavLink to='/dashboard/profile' activeClassName={style.isActive}>
            {
              user.profileImg === ''
                ? <IoIosPerson className='placeholder-profile-img' />
                : <div className='tweet-profile-img-container-menu mr-2'>
                  <img
                    className='tweet-profile-img align-self-start '
                    src={`http://localhost:5000/image/${user.profileImg}`} alt="profile" />
                </div>
            }
            <span>Profile</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
