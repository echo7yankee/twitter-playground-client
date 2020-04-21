export const filterPostsFollowers = (postObj, userId) => {
  return {
    ...postObj,
    user: {
      ...postObj.user,
      social: {
        ...postObj.user.social,
        followers: postObj.user.social.followers.filter((follow) => follow !== userId)
      }
    }
  }
}
