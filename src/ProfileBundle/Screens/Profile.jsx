import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails, updateUserDetails, uploadUserImg } from '../../Redux/actions/user/user';

//Components
import { ProfileModal } from '../Components/ProfileModal/ProfileModal';
import { PageTitle } from '../../GlobalComponents/PageTitle/PageTitle';
import { ProfileImageCover } from '../Components/ProfileImageCover/ProfileImageCover';
import { ProfileImage } from '../Components/ProfileImage/ProfileImage';
import { ProfileImageEditButton } from '../Components/ProfileImageEditButton/ProfileImageEditButton';
import { ProfileOverlayImage } from '../Components/ProfileOverlayImage/ProfileOverlayImage';
import { ProfileBio } from '../Components/ProfileBio/ProfileBio';

export const Profile = ({ match, history }) => {
  const visitorId = match.params.id;
  const state = {
    profileImg: history.location.state && history.location.state.owner.profileImg,
    isOwner: history.location.state && history.location.state.owner.isOwner,
  }
  localStorage.setItem('ownerProfileImg', state.profileImg);
  //redux 
  const userDetails = useSelector(state => state.user.userDetails);
  const dispatch = useDispatch();

  //react state
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  const [file, setFile] = useState('');
  const [showOverlayImage, setShowOverlayImage] = useState(false);

  //token
  const token = localStorage.FBIdToken;
  let userId;
  if (token) {
    userId = jwt.decode(token).params.id;
  }

  useEffect(() => {
    setUser(userDetails)
  }, [userDetails, dispatch])
  useEffect(() => {
    if (visitorId) {
      console.log('ce naiba?');
      dispatch(getUserDetails(visitorId));
      return;
    } else {
      dispatch(getUserDetails(userId));
    }
  }, [dispatch, visitorId, userId])

  //modal manipulation
  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  //update user

  const selectImage = (e) => {
    setFile(e.target.files[0])
    const formData = new FormData();
    formData.append('file', e.target.files[0])
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    dispatch(uploadUserImg(formData, config, user.id))
  }

  const updateUser = async (newUserDetails) => {
    dispatch(updateUserDetails(newUserDetails, closeModal))
  }

  return (
    user.fName ?
      <>
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
            {state.isOwner === null
              ? <ProfileImageEditButton openModal={openModal} />
              : null}
          </div>
          <div>
            <ProfileBio user={user} />
          </div>
        </div>
        {isOpen && <ProfileModal
          closeModal={closeModal}
          user={user}
          file={file}
          updateUser={updateUser}
          selectImage={selectImage}
        />}
        {showOverlayImage &&
          <ProfileOverlayImage
            user={user}
            setShowOverlayImage={setShowOverlayImage}
          />}
      </> : null
  )
}
