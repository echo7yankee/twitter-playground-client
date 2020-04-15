import React from 'react';

//react router dom
import { Link } from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';

//style
import style from './pageTitle.module.css';
import { IoMdArrowBack } from 'react-icons/io';

export const PageTitle = ({ name, hasBackButton }) => {

  const lastLocation = useLastLocation();
  let pathname = lastLocation && lastLocation.pathname;

  return (
    <div className={style.pageTitleContainer}>
      {hasBackButton
        && <Link to={pathname === null ? '/dashboard' : pathname}><IoMdArrowBack /></Link>}
      <h1>{name}</h1>
    </div>
  )
}
