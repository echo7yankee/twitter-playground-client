import React, { useState, useRef } from 'react';
import { config } from '../../../utils/constants/Environment';
import ContentEditable from 'react-contenteditable';
//services
import { getNotificationDropdownItems } from '../../Services/getNotificationDropdownItems';
import { getFollowButtonState } from '../../../utils/services/getFollowButtonState';
import { filterPostsFollowers } from '../../../TweetsBundle/Components/Tweets/Services/filterPostsFollowers';
import { addFollowerToPost } from '../../../TweetsBundle/Components/Tweets/Services/addFollowerToPost';
//redux
import { useDispatch } from 'react-redux';
import { followUser } from '../../../Redux/actions/user/user';
//style
import style from './notificationItem.module.css';
import { IoIosStar, IoIosArrowDown, IoIosPerson } from 'react-icons/io';
import { DropdownItems } from '../../../GlobalComponents/Dropdown/DropdownItems';
import { useOutsideClose } from '../../../GlobalComponents/CloseDropdown/CloseDropdown';
import { CustomLink } from '../../../GlobalComponents/CustomLink/CustomLink';
import { customLinkHistory } from '../../../utils/services/customLinkHistory';
import { pushToProfilePage } from '../../../utils/services/pushToProfilePage';
import { TweetProfileResume } from '../../../TweetsBundle/Components/TweetProfileResume/TweetProfileResume';

export const NotificationItem = ({ history, post, notificationIndex, user }) => {

  //use state
  const [notificationPost, setNotificationPost] = useState(post);
  //redux
  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(false);
  const [isProfileResume, setIsProfileResume] = useState(-1);
  const [isAnimateProfileResume, setIsAnimateProfileResume] = useState(false);

  // TODO: This is a duplicated function like the one in TweetItem. You might have to put the whole
  //post in redux store to avoid this duplication
  const handleFollow = () => {
    const isFollowed = getFollowButtonState(user.id, post.user);
    if (isFollowed) {
      setNotificationPost(filterPostsFollowers(notificationPost, user.id));
      dispatch(followUser(user.id, notificationPost.userId, 'dropdown'))
      return;
    }
    setNotificationPost(addFollowerToPost(notificationPost, user.id))
    dispatch(followUser(user.id, notificationPost.userId, 'dropdown'))
  }

  const linkRef = useRef(null);

  const wrapperRef = useRef(null);
  useOutsideClose(wrapperRef, () => setShowDropdown(false));

  const { url } = config;
  return (
    <CustomLink
      to={{
        pathname: `/dashboard/status/${notificationPost.id}`,
        state: notificationPost
      }}
      linkRef={linkRef}
      className={style.notificationItem}>
      <div className={style.notificationItemIcon}>
        <IoIosStar />
      </div>
      <div
        className={style.notificationItemHeader}
        onClick={(e) => e.preventDefault()}
        onMouseLeave={() => setIsProfileResume(-1)}
      >
        <div
          className={style.notificationItemImage}
          onClick={() => customLinkHistory(() => pushToProfilePage(`/dashboard/user/${post.username.split(' ').join('')}`,
            history, notificationPost, user))}
        >
          {notificationPost.profileImg
            ? <img
              src={`${url.API_URL}image/${notificationPost.profileImg}`}
              onMouseOver={() => setIsProfileResume(notificationIndex)}
              alt="profile" />
            : <IoIosPerson
              onMouseOver={() => setIsProfileResume(notificationIndex)}
              className='placeholder-profile-img' />
          }
        </div>
        {isProfileResume === notificationIndex
          && <div className="notificationItemProfileResumeContainer">
            <TweetProfileResume
              post={notificationPost}
              user={user}
              isAnimateProfileResume={isAnimateProfileResume}
              setIsAnimateProfileResume={setIsAnimateProfileResume}
              handleFollow={handleFollow}
            />
          </div>
        }
      </div>
      <div
        ref={wrapperRef}
        className={style.notificationItemDropdownIcon}
        onClick={(e) => {
          e.preventDefault();
          setShowDropdown((prevState) => !prevState)
          linkRef.current.focus();
        }}>
        <IoIosArrowDown
          className={showDropdown ? 'rotate-0' : 'rotate-90'} />
        <DropdownItems
          dropdownItems={getNotificationDropdownItems()}
          isDropdown={showDropdown} />
      </div>
      <div className={style.notificationItemSubtitle}>
        <span>Recent Tweet from <b>{notificationPost.username}</b></span>
      </div>
      <ContentEditable
        className={style.notificationItemContent}
        html={notificationPost.comment}
      />
    </CustomLink>
  )
}
