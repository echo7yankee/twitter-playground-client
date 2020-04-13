import { months } from '../Constants/ProfileConstants';

export const getUserCreatedDate = (date) => {
  const year = new Date(date).getFullYear();
  const monthIndex = new Date(date).getMonth();
  return {
    year,
    month: months[monthIndex]
  }
}
