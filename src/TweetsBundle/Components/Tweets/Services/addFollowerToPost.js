export const addFollowerToPost = (postObj, userId) => {
  return {
    ...postObj,
    user: {
      ...postObj.user,
      social: {
        ...postObj.user.social,
        followers: [...postObj.user.social.followers, userId]
      }
    }
  }
}
