export const cancelPostCommentEdit = (postObj, id) => {
  return {
    ...postObj,
    postComments: postObj.postComments.map((comment) => ({
      ...comment,
      isEdit: false
    }))
  }
}
