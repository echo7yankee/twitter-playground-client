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
    postReply,
    buttonText,
    isEdit,
    cancelButtonAction }
) => {


  //local state
  const [postReplyObj, setPostReply] = useState(postReply)
  const [isEmoticonPicker, setIsEmoticonPicker] = useState(false);

  const handleChange = e => {
    setPostReply({
      ...postReplyObj,
      postReply: e.target.value
    })
  }


  const handleEmojiSelector = (emojiObj) => {
    setPostReply({
      ...postReplyObj,
      postReply: `${postReplyObj.postReply} ${emojiObj.native}`
    })
  }

  const submit = (e) => {
    e.preventDefault();
    onClick(postReplyObj)
    if (hasReset) {
      setPostReply(postReply)
    }
  }

  return (
    <div className={style.tweetItemReplyCreatorContainer}>
      <ContentEditable
        placeholder={placeholder}
        onChange={handleChange}
        innerRef={innerRef}
        className={className}
        html={postReplyObj.postReply}
      />
      <TweetItemReplyButtonsSubmit
        postReplyObj={postReplyObj}
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
