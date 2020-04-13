export const getVotesForOneItem = (poll, choice) => {
  return poll.whoVoted.filter((item) => item.voteItem === choice.value);
}
