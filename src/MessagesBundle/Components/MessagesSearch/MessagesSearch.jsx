import React from 'react';
//style
import style from './messagesSearch.module.css';
//utils/assets/constants/services
//Components
import { GlobalSearch } from '../../../GlobalComponents/GlobalSearch/GlobalSearch';
export const MessagesSearch = ({ onChange, search }) => {
  return (
    <div className={style.messagesSearch}>
      <GlobalSearch
        type='text'
        placeholder='Search for people and groups'
        onChange={onChange}
        value={search}
        name='search'
      />
    </div>
  )
}
