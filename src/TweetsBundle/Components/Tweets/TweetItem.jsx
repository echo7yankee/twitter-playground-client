import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
//redux
import style from './tweets.module.css';
import { useDispatch } from 'react-redux';
import {
  createPostComment,
  removePostComment,
  editPostComment,
  likePost,
  setPostCommentEdit,
  cancelPostCommentEdit,
} from '../../../Redux/actions/post/post';
import { followUser } from '../../../Redux/actions/user/user';

//utils/constants/services
import { createPostReply } from '../../../utils/services/createPostReply';
import { getPollChoicesFiltered } from '../../../utils/services/getPollChoicesFiltered';
import { getPersonWhoLiked } from '../TweetItemSocialButtons/Services/getPersonWhoLiked';
import { filterPostsFollowers } from './Services/filterPostsFollowers';
import { addFollowerToPost } from './Services/addFollowerToPost';
import { getFollowButtonState } from '../../../utils/services/getFollowButtonState';
import { TweetsConstants } from '../../Constants/Constants';
import { GlobalConstants } from '../../../utils/constants/GlobalConstants';

//Components
import { TweetItemReply } from '../TweetItemReply/TweetItemReply';
import { TweetItemReplyCreator } from '../TweetItemReplyCreator/Components/TweetItemReplyCreator/TweetItemReplyCreator';
import { TweetItemsButtonsReply } from '../TweetItemButtonsReply/Components/TweetItemsButtonsReply';
import { TweetItemSocialButtons } from '../TweetItemSocialButtons/Components/TweetItemSocialButtons';
import { TweetItemHeaderInfo } from '../TweetItemHeaderInfo/Components/TweetItemHeaderInfo';
import { TweetPollItems } from '../TweetPoll/Components/TweetPollItems/TweetPollItems';
import { TweetProfileImg } from '../TweetProfileImg/TweetProfileImg';
import { CustomLink } from '../../../GlobalComponents/CustomLink/CustomLink';
import { Modal } from '../../../GlobalComponents/Modal/Components/Modal/Modal';
import { TweetProfileResume } from '../TweetProfileResume/TweetProfileResume';

export const TweetItem = ({
  post,
  user,
  users,
  setIsModal,
  remove,
  setPostOnEdit,
  isSingleTweet,
  history,
  postIndex }) => {
  //redux
  const dispatch = useDispatch();

  //useState
  const [isDropdown, setIsDropdown] = useState(false);
  const [isProfileResume, setProfileResume] = useState(-1);
  const [confirm, setConfirm] = useState({
    action: false,
    item: '',
  });
  const [togglePostReply, setTogglePostReply] = useState(isSingleTweet ? true : false);
  const [isReplyInput, setIsReplyInput] = useState(isSingleTweet ? true : false);
  const [postObj, setPost] = useState(post);

  const contentEditableCreator = useRef(null);
  const contentEditableEdit = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    setPost(post);
  }, [post])

  const handleLikePost = (e) => {
    e.preventDefault();
    const personWhoLiked = getPersonWhoLiked(postObj, user);
    if (personWhoLiked === user.id) {
      setPost({
        ...postObj,
        whoLiked: postObj.whoLiked.filter((like) => like !== user.id),
      })
      dispatch(likePost(postObj.id, user.id))
      return;
    }

    setPost({
      ...postObj,
      whoLiked: [...postObj.whoLiked, user.id]
    })
    dispatch(likePost(postObj.id, user.id))
  }

  const openDropdown = () => {
    setIsDropdown((prevState) => !prevState);
    linkRef.current.focus();
  }

  const closeDropdown = () => {
    setIsDropdown(false);
  }

  const action = {
    remove: () => setIsModal({
      modalState: true,
      modalAction: () => remove(post.id)
    }),
    edit: () => setPostOnEdit(post.id, true),
    follow: () => {
      const isFollowed = getFollowButtonState(user.id, postObj.user);
      if (isFollowed) {
        setPost(filterPostsFollowers(postObj, user.id));
        dispatch(followUser(user.id, post.userId, 'dropdown'))
        return;
      }
      setPost(addFollowerToPost(postObj, user.id))
      dispatch(followUser(user.id, postObj.userId, 'dropdown'))
    },
  }

  const handleReplyButton = (e) => {
    e.preventDefault();
    setTogglePostReply(true);
    setIsReplyInput(true);
    contentEditableCreator.current && contentEditableCreator.current.focus();
  }

  const cancelReply = (e) => {
    e.preventDefault();
    setIsReplyInput(false);
  }

  const handleSendButton = (comment) => {
    dispatch(createPostComment(user.id, post.id, comment))
  }

  const handleEditButton = (updatedComment) => {
    dispatch(editPostComment(postObj.id, updatedComment.id, updatedComment))
  }

  const handleSetPostCommentEdit = (id) => {
    dispatch(setPostCommentEdit(postObj.id, id))
  }

  const handleCancelPostCommentEdit = (id) => {
    dispatch(cancelPostCommentEdit(postObj.id, id))
  }

  const handleRemovePostComment = (postComment) => {
    dispatch(removePostComment(postComment.postId, postComment.id))
  }

  if (contentEditableCreator || contentEditableEdit) {
    setTimeout(() => {
      contentEditableCreator.current && contentEditableCreator.current.focus();
      contentEditableEdit.current && contentEditableEdit.current.focus();
    }, 100);
  }

  return (
    postObj.id ?
      <div>
        <CustomLink
          to={{
            pathname: `/dashboard/status/${post.id}`,
          }}
          linkRef={linkRef}
          className={style.tweet}>
          <div
            className='pos-relative'
            onMouseLeave={() => {
              setTimeout(() => {
                setProfileResume(-1)
              }, 600)
            }}
          >
            <TweetProfileImg
              profileImg={postObj.profileImg}
              classNameIcon='placeholder-profile-img'
              classNameDiv='tweet-profile-img-container mr-1'
              onMouseOver={() => setProfileResume(postIndex)}
            />
            <AnimatePresence>
              {postObj.user
                && isProfileResume === postIndex
                && <div
                  className='tweetItemProfileResumeContainer'
                  onClick={(e) => e.preventDefault()}
                  onMouseOver={(e) => e.preventDefault()}
                >
                  <TweetProfileResume
                    post={postObj}
                    user={user}
                    handleFollow={action.follow}
                    history={history}
                  />
                </div>
              }
            </AnimatePresence>
          </div>
          <div style={{ width: '61rem' }}>
            <TweetItemHeaderInfo
              postObj={postObj}
              action={action}
              isDropdown={isDropdown}
              openDropdown={openDropdown}
              closeDropdown={closeDropdown}
              user={user}
              users={users}
              history={history}
              isSingleTweet={isSingleTweet}
            />
            {postObj.poll
              && getPollChoicesFiltered(postObj.poll.choices).length > 0
              ? <div onClick={(e) => e.stopPropagation()}>
                <TweetPollItems
                  poll={postObj.poll}
                  post={postObj}
                  user={user}
                />
              </div>
              : null}
            <div className='mt-1 dflex space-between'>
              <TweetItemSocialButtons
                postObj={postObj}
                user={user}
                setTogglePostReply={setTogglePostReply}
                handleLikePost={handleLikePost}
              />
              {!isSingleTweet && <TweetItemsButtonsReply
                handleReplyButton={handleReplyButton}
                isReplyInput={isReplyInput}
                cancelReply={cancelReply}
              />}
            </div>
          </div>
        </CustomLink>
        <div className={togglePostReply
          ? style.tweetItemReplyContainerShow
          : style.tweetItemReplyContainer}
          style={isSingleTweet ? { overflow: 'initial', minHeight: '60vh' } : {}}
        >
          {postObj.postComments.map((postComment) => {
            return (
              <div key={postComment.id}>
                {
                  postComment.isEdit && !isReplyInput
                    ?
                    <TweetItemReplyCreator
                      placeholder=''
                      buttonText={TweetsConstants.TWEET_ITEM_REPLY_SUBMIT_BUTTONS.EDIT}
                      innerRef={contentEditableEdit}
                      className={style.tweetItemReplyCreator}
                      onClick={handleEditButton}
                      postComment={postComment}
                      hasReset={false}
                      isEdit={true}
                      cancelButtonAction={() => handleCancelPostCommentEdit(postComment.id)}
                    />
                    : <TweetItemReply
                      postComment={postComment}
                      setConfirm={setConfirm}
                      togglePostCommentEdit={() => {
                        setIsReplyInput(false);
                        handleSetPostCommentEdit(postComment.id);
                      }}
                      user={user}
                    />
                }
              </div>
            )
          })}
          {isReplyInput
            && <TweetItemReplyCreator
              placeholder='Reply...'
              buttonText={TweetsConstants.TWEET_ITEM_REPLY_SUBMIT_BUTTONS.SEND}
              innerRef={contentEditableCreator}
              className={style.tweetItemReplyCreator}
              onClick={handleSendButton}
              postComment={createPostReply()}
              hasReset={true}
              isEdit={false}
              cancelButtonAction={null}
            />
          }
          <AnimatePresence>
            {
              confirm.action && <Modal
                text={GlobalConstants.REMOVE_MODAL.TEXT}
                styleModal={{ width: '60rem' }}
                question={GlobalConstants.REMOVE_MODAL.QUESTION}
                buttonOneText={GlobalConstants.REMOVE_MODAL.BUTTON_ONE}
                buttonOneAction={() => handleRemovePostComment(confirm.item)}
                buttonTwoText={GlobalConstants.REMOVE_MODAL.BUTTON_TWO}
                destroyModal={() => setConfirm((prevState) => ({ ...prevState, action: false }))}
              />
            }
          </AnimatePresence>
        </div>
      </div> : null
  )
}
