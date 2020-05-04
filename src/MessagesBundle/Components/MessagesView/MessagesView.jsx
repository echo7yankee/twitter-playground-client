import React, { useEffect, useState } from 'react'
//style
// import style from './messages.module.css';
//Utils
import { userIdFromToken } from '../../../utils/services/userIdFromToken';
import { getUserFollows } from '../../../utils/services/getUserFollows';
import { createUser } from '../../../utils/services/createUser';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../../Redux/actions/user/user';
//Components
import { MessagesSearch } from '../MessagesSearch/MessagesSearch';

export const MessagesView = () => {
  //use state
  const [userObj, setUser] = useState(createUser());
  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  const followedUsers = getUserFollows(user);

  useEffect(() => {
    dispatch(getUserDetails(userIdFromToken()))
  }, [dispatch])

  useEffect(() => {
    setUser(user);
  }, [user])

  console.log(userObj);

  return (
    userObj.id
      ? <div>
        <MessagesSearch
          followedUsers={followedUsers}
          user={userObj}
          setUser={setUser}
        />
        <div className="divider" style={{ height: '1px' }} />
      </div>
      : null
  )
}
