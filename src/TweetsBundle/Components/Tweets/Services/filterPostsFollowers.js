export const filterPostsFollowers = (postObj, userId) => {
  return {
    ...postObj,
    user: {
      ...postObj.user,
      social: {
        ...postObj.user.social,
        followersCount: postObj.user.social.followersCount - 1,
        followers: postObj.user.social.followers.filter((follow) => follow !== userId)
      }
    }
  }
}
