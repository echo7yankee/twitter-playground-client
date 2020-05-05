import React, { useEffect, useState } from 'react';
//style
import style from './messages.module.css';
import { AiOutlineMail } from 'react-icons/ai';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../Redux/actions/user/user';
//Utils
import { createUser } from '../../utils/services/createUser';
import { userIdFromToken } from '../../utils/services/userIdFromToken';
//Components
import { PageTitle } from '../../GlobalComponents/PageTitle/PageTitle';
import { MessagesView } from '../Components/MessagesView/MessagesView'
import { MessagesModal } from '../Components/MessagesModal/MessagesModal';

export const Messages = () => {
  //use state
  const [isModal, setIsModal] = useState(false);
  const [userObj, setUser] = useState(createUser());
  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    dispatch(getUserDetails(userIdFromToken()))
  }, [dispatch])

  useEffect(() => {
    setUser(user);
  }, [user])

  console.log(userObj);

  return (
    <>
      <div className={style.messagesPageTitle}>
        <PageTitle
          name='Messages'
          hasBackButton={true}
        />
        <div
          className={style.messagesTitleIcon}
          onClick={() => setIsModal((prevState) => !prevState)}
        >
          <AiOutlineMail />
          <span>+</span>
        </div>
      </div>
      <div className={style.messages}>
        <MessagesView
          user={userObj}
        />
      </div>
      {isModal
        && <MessagesModal
          user={userObj}
          setUser={setUser}
          title='New Message'
          onClose={() => setIsModal(false)}
        />}
    </>
  )
}
