import React from 'react';

//style
import style from './tweetCreatorButton.module.css';
import { IoIosAdd } from 'react-icons/io';

export const TweetCreatorButton = ({ buttonState, submit, buttonText, isEdit, cancelButtonAction }) => {
  return (
    <div className={style.tweetCreatorFormButtonContainer}>
      {buttonState && <IoIosAdd className={!buttonState ? style.iconDisabled : ''} />}
      <button onClick={submit}
        className={!buttonState
          ? style.buttonDisabled
          : style.tweetCreatorBtn}
        disabled={!buttonState}
      >
        {buttonText}
      </button>
      {isEdit
        && <button
          onClick={cancelButtonAction}
          className={style.tweetCreatorCancelBtn}
          type='button'>
          Cancel
        </button>}
    </div>
  )
}
