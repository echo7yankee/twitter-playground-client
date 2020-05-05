import React, { useEffect } from 'react'
//style
import style from './chat.module.css';
//Components
import { PageTitle } from '../../../GlobalComponents/PageTitle/PageTitle';

export const Chat = ({ history }) => {
  const userVisitor = history.location && history.location.state.user;

  console.log(userVisitor);

  return (
    <div>
      <PageTitle
        name={userVisitor.username}
        hasBackButton={false}
      />
      <div className={style.chat}>
        staf
      </div>
    </div>
  )
}
