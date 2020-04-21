export const getUpdatedPost = (postsArr, updatedPost) => {
  const newPost = postsArr.map((item) => {
    if (item.uuid === updatedPost.uuid) {
      return {
        ...updatedPost,
        isEdit: false
      }
    }
    return item;
  })

  return newPost;
}
