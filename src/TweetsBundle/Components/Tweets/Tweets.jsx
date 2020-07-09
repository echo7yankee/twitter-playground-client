import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
//style
import style from './tweets.module.css';

//utils
import { GlobalConstants } from '../../../utils/constants/GlobalConstants';
import { createPost } from '../../../utils/services/createPost';

//Components
import { TweetCreator } from '../TweetCreator/Components/TweetCreator/TweetCreator';
import { TweetItem } from './TweetItem';
import { Modal } from '../../../GlobalComponents/Modal/Components/Modal/Modal';
import { Notification } from '../../../GlobalComponents/Notification/Notification';

export const Tweets = ({
  handleAddPost,
  handleEditPost,
  user,
  users,
  posts,
  remove,
  cancelButtonAction,
  setPostOnEdit,
  history,
  notificationMessage,
  notificationType,
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
            users={users}
            contentEditableRef={createTweetRef}
            contentEditablePlaceholder="What's happening?"
            buttonText='Tweet'
            isEdit={false}
            hasReset={true}
            cancelButtonAction={null}
            post={createPost()}
          />
        </div>
        <AnimatePresence className={style.tweets}>
          {posts.map((post, index) => {
            return (
              <div key={post.id}>
                {post.isEdit ?
                  <TweetCreator
                    handleSubmit={handleEditPost}
                    user={user}
                    users={users}
                    contentEditableRef={editTweetRef}
                    contentEditablePlaceholder="Edit"
                    buttonText='Edit'
                    isEdit={true}
                    hasReset={false}
                    cancelButtonAction={() => cancelButtonAction(post.id, false)}
                    post={post}
                  />
                  :
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <TweetItem
                      post={post}
                      postIndex={index}
                      user={user}
                      users={users}
                      isSingleTweet={false}
                      setIsModal={setIsModal}
                      setPostOnEdit={setPostOnEdit}
                      remove={remove}
                      history={history}
                    />
                  </motion.div>
                }
              </div>
            )
          })}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isModal.modalState
          && <Modal
            key={1}
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
        {notificationMessage && <Notification
          key={2}
          notificationMessage={notificationMessage}
          notificationType={notificationType}
        />}
      </AnimatePresence>
    </>
  )
}
