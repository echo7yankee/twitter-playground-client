import React, { useState, useEffect } from 'react';

//style
import style from './tweetPollItems.module.css';

//utils
import { getPersonWhoVoted } from '../../../../Services/getPersonWhoVoted';

//Components
import { TweetPollItem } from '../TweetPollItem/TweetPollItem';
import { getVotesForOneItem } from '../../Services/getVotesForOneItem';
import { getProgressBarPercentage } from '../../Services/getProgressBarPercentage';

export const TweetPollItems = ({
  poll,
  handleVotePoll,
  user }) => {

  //use state
  const [voteContainer, setVoteContainer] = useState({ userId: '', voteItem: '' })

  useEffect(() => {
    setVoteContainer({
      voteItem: '',
      userId: user.id
    })
  }, [user.id])


  const handlePollInputRadioChange = (e) => {
    setVoteContainer({
      ...voteContainer,
      voteItem: e.target.value
    })
  }

  const resetPollInputs = () => {
    setVoteContainer({
      ...voteContainer,
      voteItem: ''
    })
  }

  const personWhoVoted = getPersonWhoVoted(poll, user);
  const isVoteItem = voteContainer.voteItem.length ? true : false
  const { voteItem } = voteContainer;

  return (
    <div className={style.tweetPoll}>
      <ul className={style.tweetPollItems}>
        {poll.choices.map((choice) => {
          const votesForOneItem = getVotesForOneItem(poll, choice)
          const percentage = getProgressBarPercentage(votesForOneItem, poll)
          return <TweetPollItem
            key={choice.id}
            choice={choice}
            voteItem={voteItem}
            handlePollInputRadioChange={handlePollInputRadioChange}
            personWhoVoted={personWhoVoted}
            user={user}
            percentage={percentage}
            votesForOneItem={votesForOneItem}
          />
        })}
      </ul>
      {personWhoVoted
        && personWhoVoted.userId === user.id ? null
        : <div className={isVoteItem
          ? style.tweetPollVoteButton
          : style.tweetPollVoteButtonDisabled}>
          <button
            disabled={!isVoteItem}
            onClick={() => handleVotePoll(voteContainer)}>Vote</button>
          {isVoteItem && <button onClick={resetPollInputs}>Cancel</button>}
        </div>}
    </div>
  )
}
