import React, { useState } from 'react';
//style
import style from './tweetItemReplyCreator.module.css';

//Components
import ContentEditable from 'react-contenteditable';
import { TweetItemReplyButtonsSubmit } from '../TweetItemReplyButtonsSubmit/TweetItemReplyButtonsSubmit';

export const TweetItemReplyCreator = (
  { placeholder,
    hasReset,
    onClick,
    innerRef,
    className,
    postComment,
    buttonText,
    isEdit,
    cancelButtonAction }
) => {


  //local state
  const [postCommentObj, setPostReply] = useState(postComment)
  const [isEmoticonPicker, setIsEmoticonPicker] = useState(false);

  const handleChange = e => {
    setPostReply({
      ...postCommentObj,
      postComment: e.target.value
    })
  }


  const handleEmojiSelector = (emojiObj) => {
    setPostReply({
      ...postCommentObj,
      postComment: `${postCommentObj.postComment} ${emojiObj.native}`
    })
  }

  const submit = (e) => {
    e.preventDefault();
    isEdit
      ? onClick(postCommentObj)
      : onClick({
        ...postCommentObj,
      })
    if (hasReset) {
      setPostReply(postComment)
    }
  }

  return (
    <div className={style.tweetItemReplyCreatorContainer}>
      <ContentEditable
        placeholder={placeholder}
        onChange={handleChange}
        innerRef={innerRef}
        className={className}
        html={postCommentObj.postComment}
      />
      <TweetItemReplyButtonsSubmit
        postCommentObj={postCommentObj}
        submit={submit}
        buttonText={buttonText}
        isEdit={isEdit}
        cancelButtonAction={cancelButtonAction}
        handleEmojiSelector={handleEmojiSelector}
        setIsEmoticonPicker={setIsEmoticonPicker}
        isEmoticonPicker={isEmoticonPicker}
      />
    </div >
  )
}
