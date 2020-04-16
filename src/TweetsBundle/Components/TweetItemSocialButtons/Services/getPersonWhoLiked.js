export const getPersonWhoLiked = (post, user) => {
  const personWhoLiked = post.whoLiked.find(item => item === user.id);
  return personWhoLiked;
}
