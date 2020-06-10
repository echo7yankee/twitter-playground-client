import React from 'react';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2,
      }}
      exit={{ opacity: 0 }}
      className={`${style.modalOverlay} overlay-alpha-black`}
      onClick={destroyModal}>
      <motion.div
        initial={{ opacity: 0, y: 50, x: '-50%' }}
        animate={{ opacity: 1, y: '-50%' }}
        transition={{
          duration: 0.2,
        }}
        exit={{ opacity: 0, y: -30 }}
        className={style.modal}
        style={styleModal}>
        <ModalHeader
          text={text}
          question={question}
          destroyModal={destroyModal} />
        <ModalButtons
          buttonOneText={buttonOneText}
          buttonOneAction={buttonOneAction}
          buttonTwoText={buttonTwoText} />
      </motion.div>
    </motion.div>
  )
}
