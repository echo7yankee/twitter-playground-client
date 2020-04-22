import React, { useState, useRef } from 'react';

//redux
import style from './tweets.module.css';
import { useDispatch } from 'react-redux';
import {
  createPostComment,
  removePostComment,
  editPostComment,
  likePost,
} from '../../../Redux/actions/post/post';
import { followUser } from '../../../Redux/actions/user/user';

//utils/constants/services
import { createPostReply } from '../../../utils/services/createPostReply';
import { getPollChoicesFiltered } from '../../../utils/services/getPollChoicesFiltered';
import { getPersonWhoLiked } from '../TweetItemSocialButtons/Services/getPersonWhoLiked';
import { filterPostsFollowers } from './Services/filterPostsFollowers';
import { addFollowerToPost } from './Services/addFollowerToPost';
import { getFollowButtonState } from '../../../utils/services/getFollowButtonState';
import { addPostCommentToPost } from './Services/addPostCommentToPost';
import { editPostCommentFromPost } from './Services/editPostCommentFromPost';
import { setPostCommentOnEdit } from './Services/setPostCommentOnEdit';
import { cancelPostCommentEdit } from './Services/cancelPostCommentEdit';
import { TweetsConstants } from '../../Constants/Constants';

//Components
import { TweetItemReply } from '../TweetItemReply/TweetItemReply';
import { TweetItemReplyCreator } from '../TweetItemReplyCreator/Components/TweetItemReplyCreator/TweetItemReplyCreator';
import { TweetItemsButtonsReply } from '../TweetItemButtonsReply/Components/TweetItemsButtonsReply';
import { TweetItemSocialButtons } from '../TweetItemSocialButtons/Components/TweetItemSocialButtons';
import { TweetItemHeaderInfo } from '../TweetItemHeaderInfo/Components/TweetItemHeaderInfo';
import { TweetPollItems } from '../TweetPoll/Components/TweetPollItems/TweetPollItems';
import { TweetProfileImg } from '../TweetProfileImg/TweetProfileImg';
import { CustomLink } from '../../../GlobalComponents/CustomLink/CustomLink';

export const TweetItem = ({
  post,
  user,
  setIsModal,
  remove,
  setPostOnEdit,
  isSingleTweet,
  history }) => {
  //redux
  const dispatch = useDispatch();

  //useState
  const [isDropdown, setIsDropdown] = useState(false);
  const [togglePostReply, setTogglePostReply] = useState(isSingleTweet ? true : false);
  const [isReplyInput, setIsReplyInput] = useState(isSingleTweet ? true : false);
  const [postObj, setPost] = useState(post);

  const contentEditableCreator = useRef(null);
  const contentEditableEdit = useRef(null);
  const linkRef = useRef(null);

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
      modalAction: () => remove(post.uuid)
    }),
    edit: () => setPostOnEdit(post.uuid, true),
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
    setPost(addPostCommentToPost(postObj, comment, user))
    dispatch(createPostComment(user.id, post.id, comment))
  }

  const handleEditButton = (updatedComment) => {
    setPost(editPostCommentFromPost(postObj, updatedComment))
    dispatch(editPostComment(updatedComment.uuid, updatedComment))
  }

  const setEdit = (id) => {
    setPost(setPostCommentOnEdit(postObj, id))
  }

  const cancelCommentEdit = (id) => {
    setPost(cancelPostCommentEdit(postObj, id))
  }

  if (contentEditableCreator || contentEditableEdit) {
    setTimeout(() => {
      contentEditableCreator.current && contentEditableCreator.current.focus();
      contentEditableEdit.current && contentEditableEdit.current.focus();
    }, 100);
  }

  return (
    postObj.uuid ?
      <>
        <CustomLink
          to={{
            pathname: `/dashboard/status/${post.id}`,
            state: post
          }}
          linkRef={linkRef}
          className={style.tweet}>
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
              history={history}
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
              <div key={postComment.uuid}>
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
                      cancelButtonAction={() => cancelCommentEdit(postComment.uuid)}
                    />
                    : <TweetItemReply
                      postComment={postComment}
                      removeCommentFromPost={() => {
                        setPost({
                          ...postObj,
                          postComments: postObj.postComments.filter((comment) => comment.uuid !== postComment.uuid)
                        })
                        dispatch(removePostComment(postComment.uuid))
                      }}
                      togglePostCommentEdit={() => {
                        setIsReplyInput(false);
                        setEdit(postComment.uuid);
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
