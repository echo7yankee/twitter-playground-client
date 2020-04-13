import React from 'react';

//style
import style from './modal.module.css';

//Components
import { ModalHeader } from '../ModalHeader/ModalHeader';
import { ModalButtons } from '../ModalButtons/ModalButtons';

export const Modal = ({
  text,
  styleModal,
  question,
  buttonOneText,
  buttonOneAction,
  buttonTwoText,
  destroyModal }) => {
  return (
    <div className={style.modalOverlay} onClick={destroyModal}>
      <div className={style.modal} style={styleModal}>
        <ModalHeader
          text={text}
          question={question}
          destroyModal={destroyModal} />
        <ModalButtons
          buttonOneText={buttonOneText}
          buttonOneAction={buttonOneAction}
          buttonTwoText={buttonTwoText} />
      </div>
    </div>
  )
}
