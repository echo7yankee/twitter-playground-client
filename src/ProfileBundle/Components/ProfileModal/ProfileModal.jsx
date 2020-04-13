import React, { useRef, useEffect, useState } from 'react';

//style
import style from './profileModal.module.css';
import { MdClose } from 'react-icons/md';

//utils
import { isEqualToWordLimit } from '../../Services/isEqualToWordLimit';

//Components
import { ProfileModalBio } from '../ProfileModalBio/ProfileModalBio';
import { ProfileImageCover } from '../ProfileImageCover/ProfileImageCover';
import { ProfileModalForm } from '../ProfileModalForm/ProfileModalForm';
import { Modal } from '../../../GlobalComponents/Modal/Components/Modal/Modal';
import { ProfileConstants } from '../../Constants/ProfileConstants';
import { createUser } from '../../../utils/services/createUser';

export const ProfileModal = ({ user, closeModal, selectImage, updateUser }) => {

  //React state
  const [userObj, setUser] = useState(createUser());
  const [showBirthModal, setShowBirthModal] = useState(false);
  const [showBirth, setShowBirth] = useState(false);

  useEffect(() => {
    setUser(user);
  }, [user]);

  const handleChange = (e) => {
    if (isEqualToWordLimit(e)) {
      return;
    }
    setUser({
      ...userObj,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelect = (selectType, value) => {
    setUser({
      ...userObj,
      age: {
        ...userObj.age,
        [selectType]: value,
        privacy: {
          ...userObj.age.privacy,
          [selectType]: value
        }
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(userObj)
  }

  const destroyModal = () => {
    setShowBirthModal(false);
  }

  const showBirthInfo = () => {
    setShowBirth(true);
  }


  //File input ref for giving the click() method to a custom button
  const fileInputRef = useRef();

  return (
    <div className='overlay overlay-alpha-black' onClick={closeModal}>
      <div className={style.profileModal} onClick={(e) => {
        e.stopPropagation();
      }}>
        <form onSubmit={handleSubmit}>
          <div className={`dflex space-between ${style.profileModalTop}`}>
            <div className='dflex'>
              <MdClose onClick={closeModal} />
              <h1>Edit profile</h1>
            </div>
            <div>
              <button type='submit'>
                Save
              </button>
            </div>
          </div>
          <div className={style.profileModalContent}>
            <ProfileImageCover />
            <ProfileModalBio
              user={userObj}
              selectImage={selectImage}
              fileInputRef={fileInputRef} />
            <ProfileModalForm
              user={userObj}
              handleChange={handleChange}
              handleSelect={handleSelect}
              setShowBirthModal={setShowBirthModal}
              setShowBirth={setShowBirth}
              showBirth={showBirth}
            />
          </div>
        </form>
        {showBirthModal
          && <Modal
            text={ProfileConstants.BIRTH_MODAL.TEXT}
            question={ProfileConstants.BIRTH_MODAL.QUESTION}
            buttonOneText={ProfileConstants.BIRTH_MODAL.BUTTON_TWO}
            buttonTwoText={ProfileConstants.BIRTH_MODAL.BUTTON_ONE}
            destroyModal={destroyModal}
            buttonOneAction={showBirthInfo}
            styleModal={{
              width: '50%'
            }}
          />
        }
      </div>
    </div>
  )
}
