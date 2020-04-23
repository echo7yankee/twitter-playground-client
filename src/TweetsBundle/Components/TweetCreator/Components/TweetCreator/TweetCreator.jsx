import React, { useState } from 'react';
import uuidv4 from 'uuid/v4';
//style
import style from './tweetCreator.module.css';
//utils
import { TweetCreatorConstants } from '../../Constants/TweetCreatorConstants';
import { TweetCreatorPollConstants } from '../../Constants/TweetCreatorPollConstants';
import { createPollChoices } from '../../../../../utils/services/createPollChoices';
import { getPollChoicesFiltered } from '../../../../../utils/services/getPollChoicesFiltered';
import { createPoll } from '../../../../../utils/services/createPoll';
//Components
import ContentEditable from 'react-contenteditable'
import { TweetCreatorButtonIcons } from '../TweetCreatorButtonIcons/TweetCreatorButtonIcons';
import { TweetCreatorButton } from '../TweetCreatorButton/TweetCreatorButton';
import { TweetCreatorPoll } from '../TweetCreatorPoll/TweetCreatorPoll';
import { TweetProfileImg } from '../../../TweetProfileImg/TweetProfileImg';


export const TweetCreator = ({
  handleSubmit,
  user,
  contentEditableRef,
  contentEditablePlaceholder,
  buttonText,
  isEdit,
  cancelButtonAction,
  post,
  hasReset
}) => {



  //local state
  const [postObj, setPost] = useState(post)
  const [isPoll, setIsPoll] = useState(false);
  const [isEmoticonPicker, setIsEmoticonPicker] = useState(false);

  const handleChange = e => {
    setPost({
      ...postObj,
      comment: e.target.value
    })
  }

  const addOptionalChoice = () => {
    setPost({
      ...postObj,
      poll: {
        ...postObj.poll,
        choices: [
          ...postObj.poll.choices,
          createPollChoices()
        ]
      }
    })
  }

  const handlePollChoiceChange = (e, id) => {
    setPost({
      ...postObj,
      poll: {
        ...postObj.poll,
        choices: postObj.poll.choices.map((choice) => {
          if (choice.id === id) {
            if (e.target.value.length === TweetCreatorPollConstants.POLL_CHOICE_WORD_LIMIT) {
              return choice;
            }
            return {
              ...choice,
              value: e.target.value
            }
          }
          return choice;
        })
      }
    })
  }

  const handlePollLengthChange = (pollLengthType, value) => {
    setPost({
      ...postObj,
      poll: {
        ...postObj.poll,
        [pollLengthType]: value
      }
    })
  }

  const handleEmojiSelector = (emojiObj) => {
    setPost({
      ...postObj,
      comment: `${postObj.comment} ${emojiObj.native}`
    })
  }

  const submit = (e) => {
    e.preventDefault();
    const processedPostObj = {
      ...postObj,
      isNotification: user.social.followers.length > 0 ? true : false,
      poll: {
        ...postObj.poll,
        choices: getPollChoicesFiltered(postObj.poll.choices)
      }
    }

    user.id && isEdit
      ? handleSubmit(processedPostObj)
      : handleSubmit({ ...processedPostObj, uuid: uuidv4() })
    if (hasReset) {
      setPost(post)
    }
    setIsPoll(false);
  }

  const destroyPoll = () => {
    setIsPoll(false);
    setPost({
      ...postObj,
      poll: createPoll()
    })
  }

  const placeholder = isPoll ? TweetCreatorConstants.POLL_CONTENTEDITABLE_PLACEHOLDER : contentEditablePlaceholder;
  const buttonStateIfPollTrue = isPoll
    && getPollChoicesFiltered(postObj.poll.choices).length >= 2
    && postObj.comment
    ? true
    : false;
  const buttonState = isPoll ? buttonStateIfPollTrue : postObj.comment ? true : false

  return (
    <div className={style.tweetCreatorContainer}>
      <div className={style.tweetCreatorHeader}>
        <TweetProfileImg
          profileImg={user.profileImg}
          classNameIcon='placeholder-profile-img'
          classNameDiv='tweet-profile-img-container mr-1'
        />
        <div style={{ width: '61rem' }}>
          <div>
            <ContentEditable
              placeholder={placeholder}
              onChange={handleChange}
              innerRef={contentEditableRef}
              className={style.tweetCreatorTextarea}
              html={postObj.comment}
            />
            <div>
              {isPoll && <TweetCreatorPoll
                setIsPoll={setIsPoll}
                pollChoices={postObj.poll}
                addOptionalChoice={addOptionalChoice}
                handlePollChoiceChange={handlePollChoiceChange}
                handlePollLengthChange={handlePollLengthChange}
                destroyPoll={destroyPoll}
              />}
            </div>
            <div className={`dflex space-between ${style.tweetCreatorFormButtons}`}>
              <TweetCreatorButtonIcons
                setIsEmoticonPicker={setIsEmoticonPicker}
                isEmoticonPicker={isEmoticonPicker}
                handleEmojiSelector={handleEmojiSelector}
                setIsPoll={setIsPoll}
              />
              <TweetCreatorButton
                buttonState={buttonState}
                submit={submit}
                buttonText={buttonText}
                isEdit={isEdit}
                cancelButtonAction={cancelButtonAction}
              />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
