export const getPersonWhoVoted = (poll, user) => {
  const personWhoVoted = poll.whoVoted.filter(item => {
    return item.userId === user.id;
  })
  return personWhoVoted;
}
