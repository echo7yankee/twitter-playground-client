import React from 'react';

//react router dom
import { Link } from 'react-router-dom';

//style
import { FaTwitter } from 'react-icons/fa';
import style from './homegate.module.css';

export const HomeGate = () => {
  return (

    <div className={style.homeGateContainer}>
      <div className={style.homeGateTitleContainer}>
        <FaTwitter />
        <h1>
          See what's happening in the world right now
        </h1>
      </div>

      <div className={style.homeGateLinksContainer}>
        <h3>Join Twitter today.</h3>
        <div>
          <Link to='/register'>Sign up</Link>
          <Link to='/login'>Log in</Link>
        </div>
      </div>
    </div>
  )
}
