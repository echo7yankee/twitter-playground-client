import React from 'react';

//react router dom
import { NavLink } from 'react-router-dom';

//style
import { FaTwitter } from 'react-icons/fa';
import style from './navbarItems.module.css';

export const NavbarItemsLoggedOut = () => {
  return (
    <ul className={style.navbarItems}>
      <li className={style.navbarItem}>
        <NavLink to='/' exact={true} activeClassName={style.activeLink}>
          <FaTwitter />
          Home
          </NavLink>
      </li>
      <li className={style.navbarItem}>
        <NavLink to='/about' activeClassName={style.activeLink}>About</NavLink>
      </li>
      <li className={style.navbarItem}>
        <NavLink to='/register' activeClassName={style.activeLink}>Sign up</NavLink>
      </li>
      <li className={style.navbarItem}>
        <NavLink to='/login' activeClassName={style.activeLink}>Log in</NavLink>
      </li>
    </ul>
  )
}
