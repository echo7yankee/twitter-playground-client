import React, { useEffect } from 'react'
//style
import style from './messages.module.css';
//Utils
import { userIdFromToken } from '../../../utils/services/userIdFromToken';
import { getUserFollows } from '../../../utils/services/getUserFollows';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../../Redux/actions/user/user';
//Components
import { MessagesSearch } from '../MessagesSearch/MessagesSearch';

export const MessagesView = () => {
  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  const followedUsers = getUserFollows(user);

  useEffect(() => {
    dispatch(getUserDetails(userIdFromToken()))
  }, [dispatch])

  return (
    user.id
      ? <div>
        <MessagesSearch followedUsers={followedUsers} />
        <div className="divider" style={{ height: '1px' }} />
      </div>
      : null
  )
}
