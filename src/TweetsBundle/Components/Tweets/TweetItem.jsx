import React, { useState, useRef, useEffect } from 'react';

//redux
import style from './tweets.module.css';
import { useDispatch } from 'react-redux';
import {
  removePost,
  toggleEdit,
  createPostComment,
  removePostComment,
  togglePostCommentEdit,
  editPostComment,
  likePost,
} from '../../../Redux/actions/post/post';
import { followUser } from '../../../Redux/actions/user/user';

//utils
import { createPostReply } from '../../../utils/services/createPostReply';
import { getPollChoicesFiltered } from '../../../utils/services/getPollChoicesFiltered';
import { getPersonWhoLiked } from '../TweetItemSocialButtons/Services/getPersonWhoLiked';
import { filterPostsFollowers } from './Services/filterPostsFollowers';
import { addFollowerToPost } from './Services/addFollowerToPost';
import { getFollowButtonState } from '../../../utils/services/getFollowButtonState';

//Constants
import { TweetsConstants } from '../../Constants/Constants';

//Components
import { TweetItemReply } from '../TweetItemReply/TweetItemReply';
import { TweetItemReplyCreator } from '../TweetItemReplyCreator/Components/TweetItemReplyCreator/TweetItemReplyCreator';
import { TweetItemsButtonsReply } from '../TweetItemButtonsReply/Components/TweetItemsButtonsReply';
import { TweetItemSocialButtons } from '../TweetItemSocialButtons/Components/TweetItemSocialButtons';
import { TweetItemHeaderInfo } from '../TweetItemHeaderInfo/Components/TweetItemHeaderInfo';
import { TweetPollItems } from '../TweetPoll/Components/TweetPollItems/TweetPollItems';
import { TweetProfileImg } from '../TweetProfileImg/TweetProfileImg';

export const TweetItem = ({ post, user, setIsModal }) => {

  //redux
  const dispatch = useDispatch();

  //useState
  const [isDropdown, setIsDropdown] = useState(false);
  const [togglePostReply, setTogglePostReply] = useState(false);
  const [isReplyInput, setIsReplyInput] = useState(false);
  const [postObj, setPost] = useState({});

  const contentEditableCreator = useRef(null);
  const contentEditableEdit = useRef(null);

  useEffect(() => {
    setPost(post);
  }, [post])

  const handleLikePost = () => {
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
  }

  const closeDropdown = () => {
    setIsDropdown(false);
  }

  const action = {
    remove: () => setIsModal({
      modalState: true,
      modalAction: () => dispatch(removePost(post.id))
    }),
    edit: () => dispatch(toggleEdit(post.id, true)),
    follow: () => {

      const isFollowed = getFollowButtonState(user.id, post.user)
      if (isFollowed) {
        setPost(filterPostsFollowers(postObj, user.id));
        dispatch(followUser(user.id, post.userId, 'dropdown'))
        return;
      }

      setPost(addFollowerToPost(postObj, user.id))
      dispatch(followUser(user.id, post.userId, 'dropdown'))
    },
  }

  const handleReplyButton = () => {
    setTogglePostReply(true);
    setIsReplyInput(true);
    contentEditableCreator.current && contentEditableCreator.current.focus();
  }

  const cancelReply = () => {
    setIsReplyInput(false);
  }

  const handleSendButton = (comment) => {
    dispatch(createPostComment(user.id, post.id, comment))
  }

  const handleEditButton = (updatedComment) => {
    dispatch(editPostComment(updatedComment.id, updatedComment))
  }

  if (contentEditableCreator || contentEditableEdit) {
    setTimeout(() => {
      contentEditableCreator.current && contentEditableCreator.current.focus();
      contentEditableEdit.current && contentEditableEdit.current.focus();
    }, 100);
  }

  return (
    postObj.id ?
      <>
        <div className={style.tweet}>
          <TweetProfileImg
            profileImg={postObj.profileImg}
            classNameIcon='placeholder-profile-img'
            classNameDiv='tweet-profile-img-container mr-1'
          />
          <div style={{ width: '61rem' }}>
            <TweetItemHeaderInfo
              postObj={postObj}
              action={action}
              isDropdown={isDropdown}
              openDropdown={openDropdown}
              closeDropdown={closeDropdown}
              user={user}
            />
            {postObj.poll
              && getPollChoicesFiltered(postObj.poll.choices).length > 0
              ? <TweetPollItems
                poll={postObj.poll}
                postObj={postObj}
                user={user}
              />
              : null}
            <div className='mt-1 dflex space-between'>
              <TweetItemSocialButtons
                postObj={postObj}
                user={user}
                setTogglePostReply={setTogglePostReply}
                handleLikePost={handleLikePost}
              />
              <TweetItemsButtonsReply
                handleReplyButton={handleReplyButton}
                isReplyInput={isReplyInput}
                cancelReply={cancelReply}
              />
            </div>
          </div>
        </div>
        <div className={togglePostReply
          ? style.tweetItemReplyContainerShow
          : style.tweetItemReplyContainer}>
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
                      cancelButtonAction={() => dispatch(togglePostCommentEdit(postComment.id, postObj.id, false))}
                    />
                    : <TweetItemReply
                      postComment={postComment}
                      removeCommentFromPost={() => dispatch(removePostComment(postComment.id))}
                      togglePostCommentEdit={() => {
                        setIsReplyInput(false);
                        dispatch(togglePostCommentEdit(postComment.id, postObj.id, true))
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
        </div>
      </> : null
  )
}
