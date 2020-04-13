import { createPollChoices } from './createPollChoices';

export const createPoll = () => ({
  pollLengthDays: 0,
  pollLengthHours: 0,
  pollLengthMinutes: 5,
  choices: [createPollChoices(), createPollChoices()]
})
