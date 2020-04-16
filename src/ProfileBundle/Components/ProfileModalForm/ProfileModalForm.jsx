import React from 'react';

//style
import style from './profileModalForm.module.css';

//utils
import { ProfileConstants } from '../../Constants/ProfileConstants';

//Components
import { TweetInputGroupControl } from '../../../TweetsBundle/Components/TweetInputGroupControl/TweetInputGroupControl';
import { TweetTextareaGroupControl } from '../../../TweetsBundle/Components/TweetTextareaGroupControl/TweetTextareaGroupControl';
import { ProfileModalBirth } from '../ProfileModalBirth/ProfileModalBirth';

export const ProfileModalForm = ({
  user,
  handleChange,
  setShowBirthModal,
  setShowBirth,
  showBirth,
  handleSelect,
}) => {

  return (
    <div
      className={style.profileModalForm}
      style={{
        paddingBottom: showBirth ? '14rem' : '4rem'
      }}
    >
      <TweetInputGroupControl
        value={user.fName}
        onChange={handleChange}
        name='fName'
        id='fName'
        type='text'
        placeholder='Add your first name'
        wordCount={user.fName.length}
        wordLimit={ProfileConstants.WORD_LIMIT_30}
        label='First Name'
      />
      <TweetInputGroupControl
        value={user.lName}
        onChange={handleChange}
        name='lName'
        id='lName'
        type='text'
        placeholder='Add your last name'
        wordCount={user.lName.length}
        wordLimit={ProfileConstants.WORD_LIMIT_30}
        label='Last Name'
      />
      <TweetTextareaGroupControl
        value={user.bio}
        onChange={handleChange}
        name='bio'
        id='bio'
        type='text'
        placeholder='Add your bio'
        wordCount={user.bio.length}
        wordLimit={ProfileConstants.WORD_LIMIT_160}
        label='Bio'
      />
      <TweetInputGroupControl
        value={user.location}
        onChange={handleChange}
        name='location'
        id='location'
        type='text'
        placeholder='Add your location'
        wordCount={user.location.length}
        wordLimit={ProfileConstants.WORD_LIMIT_30}
        label='Location'
      />
      <TweetInputGroupControl
        value={user.website}
        onChange={handleChange}
        name='website'
        id='website'
        type='text'
        placeholder='Add your website'
        wordCount={user.website.length}
        wordLimit={ProfileConstants.WORD_LIMIT_100}
        label='Website'
      />
      <ProfileModalBirth
        showBirth={showBirth}
        setShowBirth={setShowBirth}
        setShowBirthModal={setShowBirthModal}
        handleSelect={handleSelect}
        user={user}
      />
    </div>
  )
}
