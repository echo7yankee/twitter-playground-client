export const getUserFollows = (user) => {
  return user.social && user.social.following;
}
