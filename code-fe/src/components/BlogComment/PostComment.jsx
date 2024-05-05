import { Image } from '@chakra-ui/react';
import { Button, Box, Textarea, Checkbox, Flex, Icon, Text } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { useEffect, useRef, useState } from 'react';
import styles from './BlogComment.module.scss';
import { useParams } from 'react-router-dom';
import { createComment, loadComment } from '~/services/DiscussService';
import { toast } from 'react-toastify';
import { getCurrentUserDetail, isLoggedIn } from '~/auth';
import CardComment from '~/components/BlogComment/CardComment';

function PostComment() {
  const editor = useRef(null);
  const { commentId } = useParams();
  const [comment, setComment] = useState({
    text: '',
  });
  const [user, setUser] = useState(undefined);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const printDate = (numbers) => {
    return new Date(numbers).toLocaleDateString();
  };
  const [response, setResponse] = useState(null);
  const [showComment, setShowComment] = useState(false); // State variable to control the visibility of CardComment

  const { postId } = useParams();
  //   const { userId } = getCurrentUserDetail().id;
  const handleCommentChange = (event) => {
    setComment({ text: event.target.value });
  };
  const submitPost = async () => {
    // Handle post submission logic
    if (!isLoggedIn()) {
      toast.error('Need to login first !!');
      return;
    }
    if (comment.text.trim() === '') {
      return;
    }

    const currentUser = getCurrentUserDetail();
    if (!currentUser) {
      toast.error('User details not found');
      return;
    }

    try {
      const data = await createComment(comment, postId, currentUser.id);
      setResponse(data);
      setShowComment(true);
      toast.success('Comment added');
    } catch (error) {
      toast.error('Failed to add comment');
      console.error(error);
    }
  };
  return (
    <div className={styles.comment} data-is-show="true">
      <div className={styles.editor}>
        <div className={styles.container}>
          <div className={styles['input-area']}>
            <div className={styles['follower-layer']}>
              <span className={styles['cursor-position']}>
                <div className={styles['follower-container']}>
                  <div className={styles['follower-container']}></div>
                </div>
              </span>
            </div>
            <div className={styles['style-layer-container']}>
              <div className={styles['style-layer']}></div>
            </div>
            <textarea
              className={styles['text-area']}
              placeholder="Type comment here... (Markdown is supported)"
              rows="1"
              style={{ overflow: 'hidden', overflowWrap: 'break-word', height: '50px' }}
              value={comment.text}
              onChange={handleCommentChange}
            ></textarea>
          </div>
          <div className={styles['action-area']}>
            <div className={styles['left-actions']}>
              <button className={`${styles.btn} `} data-no-border="false" data-is-hide="true">
                <div className={styles['btn-content-container']}>
                  <span className={styles['btn-content']}>Preview</span>
                </div>
              </button>
            </div>
            <div>
              <button
                className={`${styles.btn}`}
                data-no-border="true"
                disabled={comment.text.trim() === ''}
                onClick={submitPost}
              >
                <div className={styles['btn-content-container']}>
                  <span className={styles['btn-content']}>Post</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* {showComment && <CardComment response={response} />} Render CardComment when showComment is true */}
      </div>
    </div>
  );
}
export default PostComment;
