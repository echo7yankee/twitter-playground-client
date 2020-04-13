import uuidv4 from 'uuid/v4';

export const createPollChoices = () => ({
  value: '',
  id: uuidv4()
})
