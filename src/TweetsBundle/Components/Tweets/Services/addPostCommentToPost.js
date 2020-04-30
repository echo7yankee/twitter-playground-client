
export const addPostCommentToPost = (postObj, comment, user) => {
  return {
    ...postObj,
    postComments: [{
      ...comment,
      username: `${user.fName} ${user.lName}`,
      userId: user.id,
      postId: postObj.id,
      profileImg: user.profileImg,
      createdAt: new Date(),
    }, ...postObj.postComments]
  }
}
