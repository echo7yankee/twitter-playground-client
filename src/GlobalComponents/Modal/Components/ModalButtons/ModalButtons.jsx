import React from 'react';

//style
import style from './modalButtons.module.css';

export const ModalButtons = ({ buttonOneText, buttonOneAction, buttonTwoText }) => {
  return (
    <div className={style.modalButtons}>
      <button onClick={buttonOneAction}>
        {buttonOneText}
      </button>
      <button>
        {buttonTwoText}
      </button>
    </div>
  )
}
