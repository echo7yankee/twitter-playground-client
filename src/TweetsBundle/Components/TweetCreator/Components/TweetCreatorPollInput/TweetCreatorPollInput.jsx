import React from 'react';

//style
import style from './tweetCreatorPollInput.module.css';

//Components
import { TweetInputGroupControl } from '../../../TweetInputGroupControl/TweetInputGroupControl';
import { TweetCreatorPollConstants } from '../../Constants/TweetCreatorPollConstants';

export const TweetCreatorPollInput = ({
  choice,
  choiceIndex,
  type,
  width,
  label,
  onChange }) => {

  const labelProcessed = `${label} ${choiceIndex} ${choiceIndex > 2 ? '(optional)' : ''}`

  return (
    <div className={style.tweetCreatorPollInput}>
      <TweetInputGroupControl
        type={type}
        value={choice.value}
        onChange={(e) => onChange(e, choice.id)}
        style={{ width }}
        name='value'
        id={choiceIndex}
        wordCount={choice.value.length}
        wordLimit={TweetCreatorPollConstants.POLL_CHOICE_WORD_LIMIT - 1}
        label={labelProcessed}
      />
    </div>
  )
}
