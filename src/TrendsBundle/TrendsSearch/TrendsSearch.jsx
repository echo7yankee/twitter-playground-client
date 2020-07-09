import React from 'react';

//Components
import { GlobalSearch } from '../../GlobalComponents/GlobalSearch/GlobalSearch';

export const TrendsSearch = () => {

  const handleTextInputChange = (e) => {
    console.log(e);
  }

  return (
    <div>
      <GlobalSearch
        type='text'
        placeholder='Search Twitter'
        onChange={handleTextInputChange}
        value={''}
        name='search'
        fullWidth
      />
    </div>
  )
}
