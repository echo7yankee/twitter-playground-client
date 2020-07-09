export const setPostCommentOnEdit = (postObj, id) => {
  return {
    ...postObj,
    postComments: postObj.postComments.map((postComment) => {
      if (postComment.id === id) {
        return {
          ...postComment,
          isEdit: true
        }
      }
      return postComment;
    })
  }
}
