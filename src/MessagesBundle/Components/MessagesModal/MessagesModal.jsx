import React, { useEffect, useState } from 'react';
//utils
import { getUserFollows } from '../../../utils/services/getUserFollows';
//style
import style from './messagesModal.module.css';
import { IoMdClose } from 'react-icons/io';
import { MessagesModalInput } from './MessagesModalInput/MessagesModalInput';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, updateUserDetails } from '../../../Redux/actions/user/user';
//Components
import { UsersInSearch } from '../UsersInSearch/UsersInSearch';
import { MessagesModalButton } from './MessagesModalButton/MessagesModalButton';
import { UsersTag } from './UsersTag/UsersTag';
import { CustomSpinner } from '../../../GlobalComponents/CustomSpinner/CustomSpinner';

export const MessagesModal = ({
  onClose,
  title,
  user,
  setUser
}) => {
  const followedUsers = getUserFollows(user);
  //use state
  const [search, setSearch] = useState('');
  const [newUsers, setNewUsers] = useState([]);
  const [isNextPhase, setIsNextPhase] = useState(false);
  //Redux
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.usersInSearch);
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    const params = {
      _id: followedUsers,
      username: search
    }
    dispatch(getUsers(params));
    if (!newUsers.length) {
      setIsNextPhase(false);
    }
  }, [dispatch, followedUsers, search, newUsers.length])

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const addUserToNewUsers = (newUser) => {
    const roomId = user.id + newUser.id;

    const updatedUser = {
      ...newUser,
      social: {
        ...newUser.social,
        roomIds: [...newUser.social.roomIds, { id: roomId, hasAccepted: false }],
      }
    }

    const isSameUser = newUsers.some((user) => {
      return user.id === newUser.id;
    })

    const isSameUserInUser = user.social.usersToMessage.some((user) => {
      return user.id === newUser.id;
    })

    if (isSameUser || isSameUserInUser) {
      setSearch('');
      return;
    };

    setNewUsers([...newUsers, updatedUser])
    setSearch('');
  }

  const removeUserFromNewUsers = (id) => {
    setNewUsers(newUsers.filter((user) => user.id !== id))
  }

  const addNewUsersToMessages = () => {
    const roomIds = newUsers.map((newUser) => {
      const id = newUser.social.roomIds.find((roomId) => {
        return user.id + newUser.id === roomId.id
      })
      const updatedNewUser = {
        ...newUser,
        social: {
          ...newUser.social,
          usersToMessage: [...newUser.social.usersToMessage, {
            ...user,
            social: {
              ...user.social,
              usersToMessage: [...user.social.usersToMessage, ...newUsers],
              roomIds: [...user.social.roomIds, {
                ...id,
                hasAccepted: null
              }]
            }
          }]
        }
      }

      dispatch(updateUserDetails(updatedNewUser, null, 'Messages'));
      return {
        ...id,
        hasAccepted: null,
      };
    });

    const updatedUser = {
      ...user,
      social: {
        ...user.social,
        usersToMessage: [...user.social.usersToMessage, ...newUsers.map((newUser) => {
          const newUserSocial = {
            ...newUser,
            social: {
              ...newUser.social,
              usersToMessage: [...newUser.social.usersToMessage, user],
              roomId: {
                id: user.id + newUser.id,
                hasAccepted: null
              }
            }
          }
          delete newUserSocial.social.roomIds;
          return newUserSocial
        })],
        roomIds: [...user.social.roomIds, ...roomIds]
      }
    }
    setUser(updatedUser)
    dispatch(updateUserDetails(updatedUser, null, 'Messages'));
    onClose();
  }


  return (
    <div className='overlay overlay-alpha-black' onClick={onClose} style={{ zIndex: '5000' }}>
      <div
        className={style.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={style.messagesModalTop}>
          <div className={style.messagesModalTopTitle}>
            <IoMdClose onClick={onClose} />
            <span>{title}</span>
          </div>
          <div className={style.messagesModalTopButton}>
            {!isNextPhase
              ? <MessagesModalButton
                onClick={() => setIsNextPhase(true)}
                buttonText='Next'
                newUsers={newUsers}
              /> :
              <MessagesModalButton
                onClick={addNewUsersToMessages}
                buttonText='Save'
                newUsers={newUsers}
              />
            }
          </div>
        </div>
        {!isNextPhase
          ? <div className='pos-relative'>
            <MessagesModalInput
              placeholder='Search people'
              onChange={handleChange}
              value={search}
              name='search'
              type='text'
            />
            {isLoading
              && <div className={style.modalMessagesSpinner}>
                <CustomSpinner className={style.modalMessagesSpinnerImg} />
              </div>}
          </div>
          : <UsersTag
            newUsers={newUsers}
            onClick={removeUserFromNewUsers}
          />
        }
        <UsersInSearch
          users={users}
          onClick={addUserToNewUsers}
        />
      </div>
    </div>
  )
}
