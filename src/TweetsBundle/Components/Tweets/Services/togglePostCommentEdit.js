export const togglePostCommentEdit = (posts, payload, isEdit) => {
  return posts.map((post) => {
    if (post.id === payload.postId) {
      return {
        ...post,
        postComments: post.postComments.map((postComment) => {
          if (postComment.id === payload.id) {
            return {
              ...postComment,
              isEdit: !!isEdit,
            }
          }
          return postComment;
        })
      }
    }
    return post;
  })
}
