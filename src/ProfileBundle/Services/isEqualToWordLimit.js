import { ProfileConstants } from '../Constants/ProfileConstants';

export const isEqualToWordLimit = (e) => {
  if (e.target.name === 'fName'
    && e.target.value.length > ProfileConstants.WORD_LIMIT_30) {
    return true;
  }
  if (e.target.name === 'lName'
    && e.target.value.length > ProfileConstants.WORD_LIMIT_30) {
    return true;
  }
  if (e.target.name === 'bio'
    && e.target.value.length > ProfileConstants.WORD_LIMIT_160) {
    return true;
  }
  if (e.target.name === 'location'
    && e.target.value.length > ProfileConstants.WORD_LIMIT_30) {
    return true;
  }
  if (e.target.name === 'website'
    && e.target.value.length > ProfileConstants.WORD_LIMIT_100) {
    return true;
  }

  return false;
}
