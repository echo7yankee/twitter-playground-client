import React from 'react';
//style
import style from './messages.module.css';
//Components
import { PageTitle } from '../../GlobalComponents/PageTitle/PageTitle';
import { MessagesView } from '../Components/MessagesView/MessagesView'

export const Messages = () => {
  return (
    <>
      <PageTitle
        name='Messages'
        hasBackButton={true}
      />
      <div className={style.messages}>
        <MessagesView />
      </div>
    </>
  )
}
