import React from 'react';

//style
import style from './tweetItemReplyButtonsSubmit.module.css';
import 'emoji-mart/css/emoji-mart.css';
import { MdInsertEmoticon } from 'react-icons/md';

//Components
import { Picker } from 'emoji-mart';

export const TweetItemReplyButtonsSubmit = ({
  postReplyObj,
  submit,
  buttonText,
  isEdit,
  cancelButtonAction,
  handleEmojiSelector,
  setIsEmoticonPicker,
  isEmoticonPicker
}) => {
  return (
    <div className={style.tweetItemReplySubmitButtons}>
      <MdInsertEmoticon onClick={() => setIsEmoticonPicker((prevState) => !prevState)} />
      <div className={!isEmoticonPicker
        ? style.tweetItemReplyEmoji
        : style.tweetItemReplyEmojiShow}>
        <Picker
          set='twitter'
          onSelect={handleEmojiSelector}
          autoFocus={true}
          i18n={{
            search: 'Search',
            clear: 'Clear', // Accessible label on "clear" button
            notfound: 'No Emoji Found',
            skintext: 'Choose your default skin tone',
            categories: {
              search: 'Search Results',
              recent: 'Frequently Used',
              smileys: 'Smileys & Emotion',
              people: 'People & Body',
              nature: 'Animals & Nature',
              foods: 'Food & Drink',
              activity: 'Activity',
              places: 'Travel & Places',
              objects: 'Objects',
              symbols: 'Symbols',
              flags: 'Flags',
              custom: 'Custom',
            },
            categorieslabel: 'Emoji categories', // Accessible title for the list of categories
            skintones: {
              1: 'Default Skin Tone',
              2: 'Light Skin Tone',
              3: 'Medium-Light Skin Tone',
              4: 'Medium Skin Tone',
              5: 'Medium-Dark Skin Tone',
              6: 'Dark Skin Tone',
            },
          }}
        />
      </div>
      <button
        disabled={!postReplyObj.postReply && true}
        onClick={submit}
        className={postReplyObj.postReply === ''
          ? style.tweetItemReplySendButtonDisabled
          : style.tweetItemReplySendButton}>
        {buttonText}
      </button>
      {isEdit
        && <button
          onClick={cancelButtonAction}
          className={style.tweetItemReplyCancelButton}>
          Cancel
          </button>
      }
    </div>
  )
}
