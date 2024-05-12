import { Image } from '@chakra-ui/react';
import { Cont } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { useEffect, useRef, useState } from 'react';
import styles from './BlogComment.module.scss';
import { useParams } from 'react-router-dom';
import { createComment, loadComment } from '~/services/DiscussService';
import { toast } from 'react-toastify';
import { getCurrentUserDetail, isLoggedIn } from '~/auth';
import CardComment from '~/components/BlogComment/CardComment';
import PostPage from '~/pages/PostPage/PostPage';
import LoadAllComment from './LoadAllComment';
function PostComment({ commentParentId, onPostComment }) {
  const [comment, setComment] = useState({
    text: '',
    commentParent: String(commentParentId),
  });

  const printDate = (numbers) => {
    return new Date(numbers).toLocaleDateString();
  };
  const [response, setResponse] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const { postId } = useParams();
  const handleCommentChange = (event) => {
    setComment({ ...comment, text: event.target.value });
  };
  const submitPost = async () => {
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
      setComment({ ...comment, text: '' });

      toast.success('Comment added');
      onPostComment();
    } catch (error) {
      toast.error('Failed to add comment');
      console.error(error);
    }
  };
  return (
    <div
      style={{ width: 'auto', margin: '20px 10px ', borderRadius: '5px', boxSizing: 'border-box' }}
      data-is-show="true"
    >
      <div style={{ display: 'flex', height: '100%', boxSizing: 'border-box' }}>
        <textarea
          className={styles['text-area']}
          placeholder="Type comment here... (Markdown is supported)"
          rows="1"
          style={{
            overflow: 'hidden',
            overflowWrap: 'break-word',
            flex: '1',
            boxSizing: 'border-box',
            borderRadius: '5px',
          }}
          value={comment.text}
          onChange={handleCommentChange}
        ></textarea>
      </div>
      <div style={{ border: '0.0001px solid lightgray', backgroundColor: 'white', boxSizing: 'border-box' }}>
        <button className={styles.btn} data-no-border="true" disabled={comment.text.trim() === ''} onClick={submitPost}>
          <span className={styles['btn-content']}>Post</span>
        </button>
      </div>
    </div>
  );
}
export default PostComment;
