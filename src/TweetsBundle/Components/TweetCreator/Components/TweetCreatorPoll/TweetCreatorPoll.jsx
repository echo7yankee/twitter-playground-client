import React from 'react';

//style
import style from './tweetCreatorPoll.module.css';
import { IoIosAdd } from 'react-icons/io';

import { TweetCreatorPollConstants } from '../../Constants/TweetCreatorPollConstants';
//Components
import { TweetCreatorPollInput } from '../TweetCreatorPollInput/TweetCreatorPollInput';
import { TweetSelect } from '../../../TweetInputSelect/TweetSelect/TweetSelect';

export const TweetCreatorPoll = ({
  pollChoices,
  addOptionalChoice,
  handlePollChoiceChange,
  handlePollLengthChange,
  destroyPoll
}) => {

  return (
    <div className={style.tweetCreatorPollContainer}>
      {pollChoices.choices.map((choice, index) => {
        return <div className={style.tweetCreatorPollInputContainer} key={choice.id}>
          <TweetCreatorPollInput
            choice={choice}
            choiceIndex={index + 1}
            width={TweetCreatorPollConstants.CHOICE_WIDTH}
            label={TweetCreatorPollConstants.CHOICE_LABEL}
            onChange={handlePollChoiceChange}
          />
          <IoIosAdd style={{
            opacity: index === pollChoices.choices.length - 1
              ? '1'
              : '0',
            pointerEvents: index === pollChoices.choices.length - 1
              ? 'unset'
              : 'none'
          }}
            className={style.tweetCreatorPollPlusIcon}
            onClick={addOptionalChoice}
          />
        </div>
      })}
      <div className="divider"></div>
      <div className={style.tweetCreatorPollSelectContainer}>
        <div className={style.tweetCreatorPollSelectTitle}>
          <span>Poll length</span>
        </div>
        <div className={style.tweetCreatorPollSelect}>
          <TweetSelect
            label={TweetCreatorPollConstants.POLL_LENGTH_LABEL_DAYS}
            styleTweetSelect={{
              width: TweetCreatorPollConstants.POLL_LENGTH_INPUT_WIDTH
            }}
            array={TweetCreatorPollConstants.POLL_LENGTH_DAYS}
            type='pollLengthDays'
            onChange={handlePollLengthChange}
            value={pollChoices.pollLengthDays}
          />
          <TweetSelect
            label={TweetCreatorPollConstants.POLL_LENGTH_LABEL_HOURS}
            styleTweetSelect={{
              width: TweetCreatorPollConstants.POLL_LENGTH_INPUT_WIDTH
            }}
            array={TweetCreatorPollConstants.POLL_LENGTH_HOURS}
            type='pollLengthHours'
            onChange={handlePollLengthChange}
            value={pollChoices.pollLengthHours}
          />
          <TweetSelect
            label={TweetCreatorPollConstants.POLL_LENGTH_LABEL_MINUTES}
            styleTweetSelect={{
              width: TweetCreatorPollConstants.POLL_LENGTH_INPUT_WIDTH
            }}
            array={TweetCreatorPollConstants.POLL_LENGTH_MINUTES}
            type='pollLengthMinutes'
            onChange={handlePollLengthChange}
            value={pollChoices.pollLengthMinutes}
          />
        </div>
      </div>
      <div className="divider" style={{ marginBottom: '0' }}></div>
      <div className={style.tweetCreatorPollRemoveBtn} onClick={destroyPoll}>
        <button>Remove poll</button>
      </div>
    </div>
  )
}
