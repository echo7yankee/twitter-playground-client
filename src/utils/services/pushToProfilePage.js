export const pushToProfilePage = (history, post, user) => {
  history.push({
    pathname: `/dashboard/user/${post.username.split(' ').join('')}`,
    state: {
      userId: post.userId,
      owner: {
        ownerId: user.id,
        isOwner: post.userId === user.id ? null : false,
      }
    }
  })
}