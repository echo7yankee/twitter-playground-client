import React from 'react'

//style
import style from './filler.module.css';

export const Filler = ({ percentage }) => {
  return (
    <div className={style.filler} style={{ width: `${percentage}%` }}>
      <span>{percentage}%</span>
    </div>
  )
}
