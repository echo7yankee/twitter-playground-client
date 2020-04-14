import React from 'react';

//style
import style from './profileModalBirth.module.css';

//utils
import { ProfileConstants } from '../../Constants/ProfileConstants';

//Components
import { TweetSelect } from '../../../GlobalComponents/TweetInputSelect/TweetSelect/TweetSelect';

export const ProfileModalBirth = ({
  showBirth,
  setShowBirth,
  setShowBirthModal,
  handleSelect,
  user: { age }
}) => {
  return (
    <div>
      <div className={style.profileModalFormBirthBtn}>
        <span className={style.profileModalBirthSubtitle} style={{
          fontWeight: showBirth && '700'
        }}>
          Birth date
        </span>
        <span>{' '}-</span>
        <button
          type='button'
          onClick={() => {
            showBirth ? setShowBirth(false) : setShowBirthModal(true)
          }} >
          {showBirth ? 'Close' : 'Edit'}
        </button>
      </div>
      <div className={style.profileModalFormBirthTitle}>
        <h2>Add your date of birth</h2>
      </div>
      {showBirth
        &&
        <div>
          <div className={style.profileModalBirthSelect}>
            <TweetSelect
              label={ProfileConstants.BIRTH_LABEL.MONTH}
              styleTweetSelect={{
                width: ProfileConstants.BIRTH_SELECT_WIDTH.MONTH_WIDTH
              }}
              array={ProfileConstants.BIRTH_ARRAY.MONTH}
              type='month'
              onChange={handleSelect}
              value={age.month}
            />
            <TweetSelect
              label={ProfileConstants.BIRTH_LABEL.DAY}
              styleTweetSelect={{
                width: ProfileConstants.BIRTH_SELECT_WIDTH.DAY_WIDTH
              }}
              array={ProfileConstants.BIRTH_ARRAY.DAY}
              type='day'
              onChange={handleSelect}
              value={age.day}
            />
            <TweetSelect
              label={ProfileConstants.BIRTH_LABEL.YEAR}
              styleTweetSelect={{
                width: ProfileConstants.BIRTH_SELECT_WIDTH.YEAR_WIDTH
              }}
              array={ProfileConstants.BIRTH_ARRAY.YEAR}
              type='privacyYear'
              onChange={handleSelect}
              value={age.privacyYear}
            />
          </div>
          <div>
            <span className={style.profileModalBirthSubtitle} style={{
              fontWeight: showBirth && '700'
            }}>
              Who sees this?
          </span>
          </div>
          <div className={style.profileModalBirthPrivacy}>
            <TweetSelect
              label={ProfileConstants.BIRTH_LABEL.MONTH_AND_DAY}
              styleTweetSelect={{
                width: ProfileConstants.BIRTH_SELECT_WIDTH.BIRTH_SELECT_WIDTH_100
              }}
              array={ProfileConstants.BIRTH_PRIVACY_ARRAY}
              type='monthAndDay'
              onChange={handleSelect}
              value={age.privacy.monthAndDay}
            />
            <TweetSelect
              label={ProfileConstants.BIRTH_LABEL.YEAR}
              styleTweetSelect={{
                width: ProfileConstants.BIRTH_SELECT_WIDTH.BIRTH_SELECT_WIDTH_100
              }}
              array={ProfileConstants.BIRTH_PRIVACY_ARRAY}
              type='year'
              onChange={handleSelect}
              value={age.privacy.year}
            />
          </div>
        </div>
      }
    </div>
  )
}
