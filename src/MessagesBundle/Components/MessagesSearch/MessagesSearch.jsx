import React from 'react';
//style
import style from './messagesSearch.module.css';
//utils/assets/constants/services
//Components
import { GlobalSearch } from '../../../GlobalComponents/GlobalSearch/GlobalSearch';
export const MessagesSearch = ({ handleChange, search, setUser, user }) => {
  return (
    <div className='pos-relative'>
      <GlobalSearch
        type='text'
        placeholder='Search for people and groups'
        onChange={handleChange}
        value={search}
        name='search'
      />
      {/* {isLoading
        && <div className={style.messagesSearchSpinner}>
          <div className={`${style.messagesSearchSpinnerImg} lds-ring`}><div></div><div></div><div></div><div></div></div>
        </div>}
      {search
        && <UsersInSearch
          users={users}
          onClick={addUserToMessages} />
      } */}
    </div>
  )
}
