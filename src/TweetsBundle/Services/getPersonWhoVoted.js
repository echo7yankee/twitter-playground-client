export const getPersonWhoVoted = (poll, user) => {
  const personWhoVoted = poll.whoVoted.find(item => {
    return item.userId === user.id;
  })
  return personWhoVoted;
}
