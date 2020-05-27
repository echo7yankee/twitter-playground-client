import React, { useEffect, useState } from 'react';
//style
import style from './messages.module.css';
import { AiOutlineMail } from 'react-icons/ai';
//react router dom
import { Route } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, resetUserDetails, updateUserDetails, turnUserAcceptanceOnTrue } from '../../Redux/actions/user/user';
//Utils/services
import { createUser } from '../../utils/services/createUser';
import { userIdFromToken } from '../../utils/services/userIdFromToken';
import { setHasAcceptedOnTrue } from '../Services/setHasAcceptedOnTrue';
//Components
import { PageTitle } from '../../GlobalComponents/PageTitle/PageTitle';
import { MessagesView } from '../Components/MessagesView/MessagesView'
import { MessagesModal } from '../Components/MessagesModal/MessagesModal';
import { Chat } from '../Components/Chat/Chat';

export const Messages = () => {
  //use state
  const [isModal, setIsModal] = useState(false);
  const [userObj, setUser] = useState(createUser());
  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    dispatch(getUserDetails(userIdFromToken()))

    return () => {
      dispatch(resetUserDetails());
    }
  }, [dispatch])

  useEffect(() => {
    setUser(user);
  }, [user])

  const handleAcceptUser = (room) => {
    const updatedUserAdmin = {
      ...userObj,
      social: {
        ...userObj.social,
        roomIds: setHasAcceptedOnTrue(userObj, room),
      }
    }

    let visitorUser = userObj.social.usersToMessage.find((user, index) => {
      return user.social.roomIds.find((roomId) => roomId.id === room.id);
    })

    setUser(updatedUserAdmin);
    dispatch(turnUserAcceptanceOnTrue(visitorUser.id, updatedUserAdmin, room));
    dispatch(updateUserDetails(updatedUserAdmin, null, 'Messages'));
  }

  return (
    <div className={style.messagesContainer}>
      <div className={style.messagesContainerLeft}>
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
            handleAcceptUser={handleAcceptUser}
          />
        </div>
        {isModal
          && <MessagesModal
            user={userObj}
            setUser={setUser}
            title='New Message'
            onClose={() => setIsModal(false)}
          />}
      </div>
      <div className={style.messagesContainerRight}>
        <Route path='/dashboard/messages/:userId' component={Chat} />
      </div>
    </div>
  )
}
