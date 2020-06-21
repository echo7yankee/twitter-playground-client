import React from 'react';
//style
import style from './notification.module.css';
import { motion } from 'framer-motion';

export const Notification = ({ notificationMessage, notificationType }) => {
  return <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ y: 30, opacity: 0 }}
    className={
      notificationType === 'error'
        ? style.notificationWrapperError
        : notificationType === 'warning'
          ? style.notificationWrapperWarning
          : style.notificationWrapperSuccess
    }>
    <p className={style.notificationMessage}>{notificationMessage}</p>
  </motion.div>
}
