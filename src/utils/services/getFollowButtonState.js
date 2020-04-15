export const getFollowButtonState = (ownerId, user) => {
  const buttonState = user.social.followers.some((follow) => follow === ownerId);
  return buttonState;
}
