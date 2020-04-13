export const getProgressBarPercentage = (votesForOneItem, poll) => {
  return Math.round(votesForOneItem.length / poll.whoVoted.length * 100);
}
