import React from 'react'

//style
import style from './navbar.module.css';

//redux
import { useSelector } from 'react-redux';

//Components
import { NavbarItemsLoggedOut } from './NavbarItems/NavbarItemsLoggedOut'
import { NavbarItemsLoggedIn } from './NavbarItems/NavbarItemsLoggedIn';

export const Navbar = () => {

  //redux
  const authenticated = useSelector(state => state.auth.authenticated);

  return (
    <nav className={style.nav}>
      <div className="container-large">
        {authenticated ? <NavbarItemsLoggedIn /> : <NavbarItemsLoggedOut />}
      </div>
    </nav>
  )
}
