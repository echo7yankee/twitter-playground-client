import React from 'react'

//style
import style from './modalHeader.module.css';
import { MdClose } from 'react-icons/md';

export const ModalHeader = ({ text, question, destroyModal }) => {
  return (
    <div className={style.modalHeader} onClick={(e) => e.stopPropagation()}>
      <div>
        <p>{text}</p>
        <div className="divider"></div>
        <p>{question}</p>
      </div>
      <MdClose onClick={destroyModal} />
    </div>
  )
}
