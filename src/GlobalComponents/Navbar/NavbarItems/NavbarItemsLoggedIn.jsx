import React from 'react';

//style
import style from './navbarItems.module.css';
import { FaTwitter } from 'react-icons/fa';

//redux
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../Redux/actions/auth/auth';

//react router dom
import { NavLink } from 'react-router-dom';

export const NavbarItemsLoggedIn = () => {

  const dispatch = useDispatch();

  return (
    <ul className={style.navbarItems}>
      <li className={style.navbarItem}>
        <NavLink to='/dashboard' activeClassName={style.activeLink}>
          <FaTwitter />
          Home
          </NavLink>
      </li>
      <li className={style.navbarItem} >
        <NavLink to='/' onClick={() => dispatch(logoutUser())}>Log out</NavLink>
      </li>
    </ul>
  )
}
