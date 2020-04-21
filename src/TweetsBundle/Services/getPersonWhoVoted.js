export const getPersonWhoVoted = (poll, user) => {
  // console.log(poll);
  const personWhoVoted = poll.whoVoted && poll.whoVoted.find(item => {
    return item.userId === user.id;
  })
  return personWhoVoted;
}
