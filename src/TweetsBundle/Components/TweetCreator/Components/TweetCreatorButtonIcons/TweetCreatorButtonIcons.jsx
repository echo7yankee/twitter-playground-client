import React, { useRef } from 'react';

//style
import style from './tweetCreatorButtonIcons.module.css'
import 'emoji-mart/css/emoji-mart.css';
import { AiOutlinePicture } from 'react-icons/ai';
import { MdGif, MdInsertEmoticon } from 'react-icons/md';
import { FaPollH } from 'react-icons/fa';

//Components
import { useOutsideClose } from '../../../../../GlobalComponents/CloseDropdown/CloseDropdown';
import { Picker } from 'emoji-mart';

export const TweetCreatorButtonIcons = ({
  setIsEmoticonPicker,
  isEmoticonPicker,
  handleEmojiSelector,
  setIsPoll
}) => {

  const wrapperRef = useRef(null);
  useOutsideClose(wrapperRef, () => setIsEmoticonPicker(false));

  return (
    <div className={style.tweetCreatorFormIcons} ref={wrapperRef}>
      <AiOutlinePicture className={style.tweetCreatorFormIcon} />
      <MdGif className={style.tweetCreatorFormIcon} />
      <FaPollH
        className={style.tweetCreatorFormIcon}
        onClick={() => setIsPoll(true)} />
      <MdInsertEmoticon
        className={style.tweetCreatorFormIcon}
        onClick={() => setIsEmoticonPicker((prevState) => !prevState)}
      />
      <div className={isEmoticonPicker
        ? style.emoticonPickerContainerShow
        : style.emoticonPickerContainer}
      >
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
    </div>
  )
}
