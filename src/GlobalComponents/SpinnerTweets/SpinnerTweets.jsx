import React from 'react';
import spinner from '../../assets/gifs/spinner.gif';

//style
import style from './spinner.module.css';

export const SpinnerTweets = () => {
  return (
    <div className={style.spinnerTweetsContainer}>
      <img src={spinner} alt='spinner' />
    </div>
  )
}
