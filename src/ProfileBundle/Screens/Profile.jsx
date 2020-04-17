import React, { useEffect, useState } from 'react';

//style
import style from './profile.module.css';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails, updateUserDetails, uploadUserImg, followUser, resetUserDetails } from '../../Redux/actions/user/user';

//Components
import { ProfileModal } from '../Components/ProfileModal/ProfileModal';
import { PageTitle } from '../../GlobalComponents/PageTitle/PageTitle';
import { ProfileImageCover } from '../Components/ProfileImageCover/ProfileImageCover';
import { ProfileImage } from '../Components/ProfileImage/ProfileImage';
import { ProfileImageEditButton } from '../Components/ProfileImageEditButton/ProfileImageEditButton';
import { ProfileOverlayImage } from '../Components/ProfileOverlayImage/ProfileOverlayImage';
import { ProfileBio } from '../Components/ProfileBio/ProfileBio';
import { SpinnerTweets } from '../../GlobalComponents/SpinnerTweets/SpinnerTweets';
import { userIdFromToken } from '../../utils/services/userIdFromToken';

export const Profile = ({ history }) => {
  const state = {
    ownerId: history.location.state && history.location.state.owner.ownerId,
    isOwner: history.location.state && history.location.state.owner.isOwner,
    userId: history.location.state && history.location.state.userId
  }
  const id = state.userId || userIdFromToken();

  //redux 
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  const isLoading = useSelector((state) => state.user.isLoading);

  //react state
  const [isOpen, setIsOpen] = useState(false);
  const [showOverlayImage, setShowOverlayImage] = useState(false);
  useEffect(() => {
    dispatch(getUserDetails(id));

    return () => {
      dispatch(resetUserDetails());
    }
  }, [dispatch, id])

  //modal manipulation
  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  //update user

  const selectImage = (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0])
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    localStorage.setItem('ownerProfileImg', e.target.files[0].name);
    dispatch(uploadUserImg(formData, config, user.id))
  }

  const updateUser = async (newUserDetails) => {
    dispatch(updateUserDetails(newUserDetails, closeModal))
  }

  const handleFollowUser = (ownerId, visitorId) => {
    dispatch(followUser(ownerId, visitorId, 'profile'));
  }

  return (
    isLoading || !user.id
      ? <SpinnerTweets />
      : <div className={style.profile}>
        <div>
          <PageTitle
            name={`${user.fName} ${user.lName}`}
            hasBackButton={true}
          />
          <ProfileImageCover />
          <div className='dflex space-between pl-2 pr-2'>
            <ProfileImage
              user={user}
              setShowOverlayImage={setShowOverlayImage} />
            <ProfileImageEditButton
              state={state}
              user={user}
              handleFollowUser={handleFollowUser}
              openModal={openModal} />
          </div>
          <div>
            <ProfileBio user={user} />
          </div>
        </div>
        {isOpen && <ProfileModal
          closeModal={closeModal}
          user={user}
          updateUser={updateUser}
          selectImage={selectImage}
        />}
        {showOverlayImage &&
          <ProfileOverlayImage
            user={user}
            setShowOverlayImage={setShowOverlayImage}
          />}
      </div>
  )
}
