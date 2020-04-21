import React, { useState, useRef } from 'react';

//style
import style from './tweets.module.css';

//utils
import { GlobalConstants } from '../../../utils/constants/GlobalConstants';
import { createPost } from '../../../utils/services/createPost';

//Components
import { TweetCreator } from '../TweetCreator/Components/TweetCreator/TweetCreator';
import { TweetItem } from './TweetItem';
import { Modal } from '../../../GlobalComponents/Modal/Components/Modal/Modal';

export const Tweets = ({
  handleAddPost,
  handleEditPost,
  user,
  posts,
  cancelButtonAction
}) => {

  //state
  const [isModal, setIsModal] = useState({
    modalState: false,
    modalAction: '',
  });

  const createTweetRef = useRef(null);
  const editTweetRef = useRef(null);

  const destroyModal = () => {
    setIsModal(false);
  }

  return (
    <>
      <div className={style.tweetsContainer}>
        <div>
          <TweetCreator
            handleSubmit={handleAddPost}
            user={user}
            contentEditableRef={createTweetRef}
            contentEditablePlaceholder="What's happening?"
            buttonText='Tweet'
            isEdit={false}
            hasReset={true}
            cancelButtonAction={null}
            post={createPost()}
          />
        </div>
        <div className={style.tweets}>
          {posts && posts.map(post => {
            return (
              <div key={post.id}>
                {post.isEdit ?
                  <TweetCreator
                    handleSubmit={handleEditPost}
                    user={user}
                    contentEditableRef={editTweetRef}
                    contentEditablePlaceholder="Edit"
                    buttonText='Edit'
                    isEdit={true}
                    hasReset={false}
                    cancelButtonAction={() => cancelButtonAction(post.id, false)}
                    post={post}
                  />
                  : <TweetItem
                    post={post}
                    user={user}
                    setIsModal={setIsModal}
                  />}
              </div>
            )
          })}
        </div>
      </div>
      {isModal.modalState
        && <Modal
          text={GlobalConstants.REMOVE_MODAL.TEXT}
          question={GlobalConstants.REMOVE_MODAL.QUESTION}
          buttonOneText={GlobalConstants.REMOVE_MODAL.BUTTON_ONE}
          buttonTwoText={GlobalConstants.REMOVE_MODAL.BUTTON_TWO}
          destroyModal={destroyModal}
          buttonOneAction={isModal.modalAction}
          styleModal={{
            width: '60rem'
          }}
        />}
    </>
  )
}