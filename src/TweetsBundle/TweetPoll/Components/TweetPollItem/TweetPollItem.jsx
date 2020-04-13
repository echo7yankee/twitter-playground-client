import React from 'react'

//style
import style from './tweetPollItem.module.css';

//Components
import { ProgressBar } from '../../../../GlobalComponents/ProgressBar/Components/ProgressBar/ProgressBar';
import { InputRadio } from '../../../../GlobalComponents/Inputs/InputRadio/InputRadio';

export const TweetPollItem = ({ choice,
  handlePollInputRadioChange,
  voteItem,
  personWhoVoted,
  user,
  percentage,
  votesForOneItem,
}) => {

  return (
    <li className={style.tweetPollItem}>
      {personWhoVoted
        && personWhoVoted.userId === user.id ?
        <div>
          <ProgressBar
            percentage={percentage}
            label={choice.value}
            votesForOneItem={votesForOneItem}
          />
        </div>
        : <InputRadio
          type='radio'
          id={choice.value}
          name='poll'
          checked={choice.value === voteItem}
          value={choice.value}
          onChange={handlePollInputRadioChange}
        />
      }
      {personWhoVoted &&
        personWhoVoted.userId === user.id
        ? null
        : <label htmlFor={choice.value}>{choice.value}</label>}
    </li>
  )
}
