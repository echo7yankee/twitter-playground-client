import tweetItemDropdownArr from '../Services/getTweetItemDropdownArr';

export const filterDropdownItems = (postObj, userId, action) => {
  const filteredTweetItemsDropdown = tweetItemDropdownArr(postObj, userId, action)
    .filter((item) => item.name !== null && item.name)
  return filteredTweetItemsDropdown;
}
