import React from 'react'

export const SingleTweet = ({ match }) => {
  const postId = match.params.postId;
  console.log(postId);
  return (
    <div>
      Single tweet
    </div>
  )
}
