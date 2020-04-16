//utils
import { generateLength } from "../../../../utils/services/generateLength";

export const TweetCreatorPollConstants = {
  CHOICE_WIDTH: '100%',
  CHOICE_LABEL: 'Choice',
  POLL_LENGTH_INPUT_WIDTH: '33.3%',
  POLL_LENGTH_LABEL_DAYS: 'Days',
  POLL_LENGTH_LABEL_HOURS: 'Hours',
  POLL_LENGTH_LABEL_MINUTES: 'Minutes',
  POLL_CHOICE_WORD_LIMIT: 26,
  POLL_LENGTH_DAYS: generateLength(0, 7),
  POLL_LENGTH_HOURS: generateLength(0, 24),
  POLL_LENGTH_MINUTES: generateLength(5, 60),
}
