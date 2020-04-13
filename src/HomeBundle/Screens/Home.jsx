import React from 'react'

//style
import style from './home.module.css';

//react router dom
import { Redirect } from 'react-router-dom';

//redux
import { useSelector } from 'react-redux';

//Components
import { HomeInfo } from '../Components/HomeInfo/HomeInfo'
import { HomeGate } from '../Components/HomeGate/HomeGate'
import { HomeAuth } from '../Components/HomeAuth/HomeAuth';

export const Home = ({ history }) => {

  const authenticated = useSelector(state => state.auth.authenticated);

  if (authenticated) { return <Redirect to='/dashboard' /> }

  return (
    <div className={style.homeContainer}>
      <div className={style.homeHalf}>
        <HomeInfo />
      </div>
      <div className={style.homeHalf}>
        <HomeAuth history={history} />
        <HomeGate />
        <div></div>
      </div>
    </div>
  )
}
