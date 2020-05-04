import React, { useEffect, useState } from 'react';
//style
import style from './messagesSearch.module.css';
//utils/assets/constants/services

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getUsersInSearch, updateUserDetails } from '../../../Redux/actions/user/user';
//Components
import { GlobalSearch } from '../../../GlobalComponents/GlobalSearch/GlobalSearch';
import { UsersInSearch } from '../UsersInSearch/UsersInSearch';


export const MessagesSearch = ({ followedUsers, setUser, user }) => {
  //use state
  const [search, setSearch] = useState('');
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
  }, [dispatch, followedUsers, search])

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const addUserToMessages = (newUser) => {
    const updatedUser = {
      ...user,
      social: {
        ...user.social,
        usersToMessage: [...user.social.usersToMessage, newUser]
      }
    }
    const isSameUser = user.social.usersToMessage.some((user) => {
      return user.id === newUser.id;
    })
    if (isSameUser) {
      setSearch('');
      return;
    };

    setUser(updatedUser)
    dispatch(updateUserDetails(updatedUser, null, 'Messages'));
    setSearch('');
  }

  return (
    <div className='pos-relative'>
      <GlobalSearch
        type='text'
        placeholder='Search for people and groups'
        onChange={handleChange}
        value={search}
        name='search'
      />
      {isLoading
        && <div className={style.messagesSearchSpinner}>
          <div className={`${style.messagesSearchSpinnerImg} lds-ring`}><div></div><div></div><div></div><div></div></div>
        </div>}
      {search
        && <UsersInSearch
          users={users}
          onClick={addUserToMessages} />
      }
    </div>
  )
}
