import React from 'react';

//style
import style from './profileModalBio.module.css';
import { AiOutlineCamera } from 'react-icons/ai';

//Components
import { ProfileImg } from '../../../GlobalComponents/ProfileImg/ProfileImg';

export const ProfileModalBio = ({ user, selectImage, fileInputRef }) => {
  return (
    <div className={style.profileModalBio}>
      <div>
        <div className={style.profileModalImgContainer}>
          <ProfileImg user={user} />
          <input
            type="file"
            className='file-input'
            ref={fileInputRef}
            onChange={selectImage}
          />
          <AiOutlineCamera
            className={style.profileModalIcon} onClick={() => fileInputRef.current.click()} />
        </div>
      </div>
    </div>
  )
}
