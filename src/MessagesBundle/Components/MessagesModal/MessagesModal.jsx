import React, { useEffect, useState } from 'react';
//utils
import { getUserFollows } from '../../../utils/services/getUserFollows';
//style
import style from './messagesModal.module.css';
import { IoMdClose } from 'react-icons/io';
import { MessagesModalInput } from './MessagesModalInput/MessagesModalInput';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getUsersInSearch, updateUserDetails } from '../../../Redux/actions/user/user';
//Components
import { UsersInSearch } from '../UsersInSearch/UsersInSearch';
import { MessagesModalButton } from './MessagesModalButton/MessagesModalButton';
import { UsersTag } from './UsersTag/UsersTag';

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
      username: search,
    }
    dispatch(getUsersInSearch(params));
    if (!newUsers.length) {
      setIsNextPhase(false);
    }
  }, [dispatch, followedUsers, search, newUsers.length])

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const addUserToNewUsers = (newUser) => {
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

    setNewUsers([...newUsers, newUser])
    setSearch('');
  }

  const removeUserFromNewUsers = (id) => {
    setNewUsers(newUsers.filter((user) => user.id !== id))
  }

  const addNewUsersToMessages = () => {
    const updatedUser = {
      ...user,
      social: {
        ...user.social,
        usersToMessage: [...user.social.usersToMessage, ...newUsers]
      }
    }
    setUser(updatedUser)
    dispatch(updateUserDetails(updatedUser, null, 'Messages'));
    onClose();
  }

  return (
    <div className='overlay overlay-alpha-black' onClick={onClose}>
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
                <div className={`${style.modalMessagesSpinnerImg} lds-ring`}><div></div><div></div><div></div><div></div></div>
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
