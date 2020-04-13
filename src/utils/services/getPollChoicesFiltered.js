export const getPollChoicesFiltered = (pollChoices) => {
  const filteredPollChoices = pollChoices.filter((choice) => choice.value !== '');
  return filteredPollChoices;
}
