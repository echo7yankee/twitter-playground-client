import React, { useState, useRef } from 'react';

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
  votePoll,
} from '../../../Redux/actions/post/post';
import { followUser } from '../../../Redux/actions/user/user';

//utils
import { createPostReply } from '../../../utils/services/createPostReply';
import { getPollChoicesFiltered } from '../../../utils/services/getPollChoicesFiltered';

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

  //local state
  const [isDropdown, setIsDropdown] = useState(false);
  const [togglePostReply, setTogglePostReply] = useState(false);
  const [isReplyInput, setIsReplyInput] = useState(false);

  const contentEditableCreator = useRef(null);
  const contentEditableEdit = useRef(null);

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
    follow: () => dispatch(followUser(user.id, post.userId, 'dropdown')),
  }

  const handleVotePoll = (voteContainer) => {
    dispatch(votePoll(post.id, voteContainer))
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
    <>
      <div className={style.tweet}>
        <TweetProfileImg
          profileImg={post.profileImg}
          classNameIcon='placeholder-profile-img'
          classNameDiv='tweet-profile-img-container mr-1'
        />
        <div style={{ width: '61rem' }}>
          <TweetItemHeaderInfo
            post={post}
            action={action}
            isDropdown={isDropdown}
            openDropdown={openDropdown}
            closeDropdown={closeDropdown}
            user={user}
          />
          {post.poll
            && getPollChoicesFiltered(post.poll.choices).length > 0
            ? <TweetPollItems
              poll={post.poll}
              handleVotePoll={handleVotePoll}
              user={user}
            />
            : null}
          <div className='mt-1 dflex space-between'>
            <TweetItemSocialButtons
              post={post}
              user={user}
              setTogglePostReply={setTogglePostReply}
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
        {post.postComments.map((postComment) => {
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
                    cancelButtonAction={() => dispatch(togglePostCommentEdit(postComment.id, post.id, false))}
                  />
                  : <TweetItemReply
                    postComment={postComment}
                    removeCommentFromPost={() => dispatch(removePostComment(postComment.id))}
                    togglePostCommentEdit={() => {
                      setIsReplyInput(false);
                      dispatch(togglePostCommentEdit(postComment.id, post.id, true))
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
    </>
  )
}
