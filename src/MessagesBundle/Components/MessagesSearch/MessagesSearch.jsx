import React, { useEffect, useState } from 'react';
//style
import style from './messagesSearch.module.css';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../Redux/actions/user/user';
//Components
import { GlobalSearch } from '../../../GlobalComponents/GlobalSearch/GlobalSearch';

export const MessagesSearch = ({ followedUsers }) => {
  //use state
  const [search, setSearch] = useState('');
  const params = {
    _id: followedUsers,
    username: search,
  }
  //Redux
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    dispatch(getUsers(params));
  }, [dispatch, params])

  console.log(users);
  console.log(search);

  return (
    <div>
      <GlobalSearch
        type='text'
        placeholder='Search for people and groups'
        onChange={handleChange}
        value={search}
        name='search'
      />
    </div>
  )
}
