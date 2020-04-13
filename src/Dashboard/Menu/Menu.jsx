import React, { useEffect } from 'react';
import { config } from '../../utils/constants/Environment';
import jwt from 'jsonwebtoken'
//style
import style from './menu.module.css';
import { IoMdHome, IoIosPerson } from 'react-icons/io';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails } from '../../Redux/actions/user/user';

//react router dom
import { NavLink } from 'react-router-dom';

export const Menu = () => {
  const { url } = config;
  const user = useSelector(state => state.user.userDetails);
  const ownerProfileImg = localStorage.getItem('ownerProfileImg');
  //redux
  const dispatch = useDispatch();

  //token
  const token = localStorage.FBIdToken;
  let userId;
  if (token) {
    userId = jwt.decode(token).params.id;
  }

  useEffect(() => {
    if (ownerProfileImg === 'null') {
      dispatch(getUserDetails(userId));
    }
  }, [userId, dispatch, ownerProfileImg])

  const profileImg = ownerProfileImg !== 'null' ? ownerProfileImg : user.profileImg

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
