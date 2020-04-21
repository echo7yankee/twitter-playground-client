import React, { useState, useEffect } from 'react';

//style
import style from './tweetPollItems.module.css';

//utils
import { getPersonWhoVoted } from '../../../../Services/getPersonWhoVoted';
//redux
import { useDispatch } from 'react-redux';
import { votePoll } from '../../../../../Redux/actions/post/post';
//Components
import { TweetPollItem } from '../TweetPollItem/TweetPollItem';
import { getVotesForOneItem } from '../../Services/getVotesForOneItem';
import { getProgressBarPercentage } from '../../Services/getProgressBarPercentage';


export const TweetPollItems = ({
  poll,
  post,
  user }) => {
  //redux
  const dispatch = useDispatch();
  //use state
  const [voteContainer, setVoteContainer] = useState({ userId: '', voteItem: '' })
  const [pollObj, setPoll] = useState({});

  useEffect(() => {
    setVoteContainer({
      voteItem: '',
      userId: user.id
    })
    setPoll(poll)
  }, [user.id, poll])


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

  const handleVotePoll = (voteContainer) => {
    setPoll({
      ...poll,
      whoVoted: [...pollObj.whoVoted, voteContainer],
    })
    dispatch(votePoll(post.uuid, voteContainer))
  }

  const personWhoVoted = getPersonWhoVoted(pollObj, user);
  const isVoteItem = voteContainer.voteItem.length ? true : false
  const { voteItem } = voteContainer;

  return (
    pollObj.choices && pollObj.choices.length ?
      <div className={style.tweetPoll}>
        <ul className={style.tweetPollItems}>
          {pollObj.choices.map((choice) => {
            const votesForOneItem = getVotesForOneItem(pollObj, choice)
            const percentage = getProgressBarPercentage(votesForOneItem, pollObj)
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
      </div> : null
  )
}
