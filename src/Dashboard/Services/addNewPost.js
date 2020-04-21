export const addNewPost = (post, { userId, username, profileImg }) => {
  return {
    ...post,
    createdAt: new Date(),
    userId,
    username,
    profileImg
  }
}
