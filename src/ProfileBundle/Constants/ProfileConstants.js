import { generateLength } from "../../utils/services/generateLength";

const date = new Date()
const year = date.getFullYear();
export const months = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const ProfileConstants = {
  WORD_LIMIT_30: 30,
  WORD_LIMIT_100: 100,
  WORD_LIMIT_160: 160,
  BIRTH_LABEL: {
    MONTH: 'Month',
    DAY: 'Day',
    YEAR: 'Year',
    MONTH_AND_DAY: 'Month and day',
  },
  BIRTH_SELECT_WIDTH: {
    MONTH_WIDTH: '50%',
    BIRTH_SELECT_WIDTH_100: '100%',
    DAY_WIDTH: '25%',
    YEAR_WIDTH: '25%',
  },
  BIRTH_MODAL: {
    TEXT: 'This can only be changed a few times',
    QUESTION: 'Edit date of birth?',
    BUTTON_ONE: 'Cancel',
    BUTTON_TWO: 'Edit'
  },
  BIRTH_ARRAY: {
    MONTH: months,
    DAY: generateLength(1, 31),
    YEAR: generateLength(1900, year).reverse(),
  },
  BIRTH_PRIVACY_ARRAY: ['Public',
    'Your Followers',
    'People you follow',
    'You only follow each other',
    'Only You'],
}
