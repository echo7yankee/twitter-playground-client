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
  votePoll,
} from '../Redux/actions/post/post';

//utils
import { createPostReply } from '../utils/services/createPostReply';
import { getPollChoicesFiltered } from '../utils/services/getPollChoicesFiltered';

//Constants
import { TweetsConstants } from './Constants/Constants';

//Components
import { TweetItemReply } from './TweetItemReply/TweetItemReply';
import { TweetItemReplyCreator } from '../GlobalComponents/TweetItemReplyCreator/Components/TweetItemReplyCreator/TweetItemReplyCreator';
import { TweetItemsButtonsReply } from '../GlobalComponents/TweetItemButtonsReply/Components/TweetItemsButtonsReply';
import { TweetItemSocialButtons } from '../GlobalComponents/TweetItemSocialButtons/Components/TweetItemSocialButtons';
import { TweetItemHeaderInfo } from '../GlobalComponents/TweetItemHeaderInfo/Components/TweetItemHeaderInfo';
import { TweetItemHeaderInfoProfile } from '../GlobalComponents/TweetItemHeaderInfo/Components/TweetItemHeaderInfoProfile';
import { TweetPollItems } from './TweetPoll/Components/TweetPollItems/TweetPollItems';

export const TweetItem = ({ post, user, setIsModal }) => {

  //redux
  const dispatch = useDispatch();

  //local state
  const [isDropdown, setIsDropdown] = useState(false);
  const [togglePostReply, setTogglePostReply] = useState(false);
  const [isReplyInput, setIsReplyInput] = useState(false);
  const [voteContainer, setVoteContainer] = useState({ userId: '', voteItem: '' })

  const contentEditableCreator = useRef(null);
  const contentEditableEdit = useRef(null);

  useEffect(() => {
    setVoteContainer({
      voteItem: '',
      userId: user.id
    })
  }, [user.id])

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
  }

  const handlePollInputRadioChange = (e) => {
    setVoteContainer({
      ...voteContainer,
      voteItem: e.target.value
    })
  }

  const resetPollInputs = () => {
    setVoteContainer({
      ...voteContainer,
      voteItem: ''
    })
  }

  const handleVotePoll = () => {
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
        <TweetItemHeaderInfoProfile post={post} />
        <div style={{ width: '100%' }}>
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
              handlePollInputRadioChange={handlePollInputRadioChange}
              isVoteItem={voteContainer.voteItem.length ? true : false}
              resetPollInputs={resetPollInputs}
              voteItem={voteContainer.voteItem}
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
        {post.postComments.map((postReply) => {
          return (
            <div key={postReply.id}>
              {
                postReply.isEdit && !isReplyInput
                  ?
                  <TweetItemReplyCreator
                    placeholder=''
                    buttonText={TweetsConstants.TWEET_ITEM_REPLY_SUBMIT_BUTTONS.EDIT}
                    innerRef={contentEditableEdit}
                    className={style.tweetItemReplyCreator}
                    onClick={handleEditButton}
                    postReply={postReply}
                    hasReset={false}
                    isEdit={true}
                    cancelButtonAction={() => dispatch(togglePostCommentEdit(postReply.id, post.id, false))}
                  />
                  : <TweetItemReply
                    postReply={postReply}
                    removeCommentFromPost={() => dispatch(removePostComment(postReply.id))}
                    togglePostCommentEdit={() => {
                      setIsReplyInput(false);
                      dispatch(togglePostCommentEdit(postReply.id, post.id, true))
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
            postReply={createPostReply()}
            hasReset={true}
            isEdit={false}
            cancelButtonAction={null}
          />
        }
      </div>
    </>
  )
}
