import { createPoll } from "./createPoll"

export const createPost = () => {
  return {
    postComments: [],
    whoLiked: [],
    comment: '',
    userId: '',
    username: '',
    profileImg: '',
    poll: createPoll()
  }
}
