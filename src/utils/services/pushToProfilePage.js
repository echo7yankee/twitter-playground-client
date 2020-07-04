export const pushToProfilePage = (pathname, history, post, user, userFollows) => {
  history.push({
    pathname,
    state: {
      userId: post.userId,
      owner: {
        ownerId: user.id,
        isOwner: post.userId === user.id ? null : false,
        userFollows
      }
    }
  })
}
