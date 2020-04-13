import React from 'react';

//style
import style from './progressBar.module.css';

//Components
import { Filler } from '../Filler/Filler';

export const ProgressBar = ({ percentage, label, votesForOneItem }) => {
  return (
    <div className={style.progressBar}>
      <Filler percentage={percentage} label={label} votesForOneItem={votesForOneItem} />
      <span>{`${votesForOneItem.length}  ${label}`}</span>
    </div>
  )
}
