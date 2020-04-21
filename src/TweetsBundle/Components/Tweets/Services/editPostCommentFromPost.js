export const editPostCommentFromPost = (postObj, updatedComment) => {
  return {
    ...postObj,
    postComments: postObj.postComments.map((postComment) => {
      if (postComment.uuid === updatedComment.uuid) {
        return {
          ...updatedComment,
          createdAt: new Date(),
          isEdit: false
        }
      }
      return postComment;
    })
  }
}
