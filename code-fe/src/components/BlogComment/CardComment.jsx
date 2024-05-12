import { Image } from '@chakra-ui/react';
import { Avatar, Text, Container, Button, Link } from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';
import styles from './BlogComment.module.scss';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loadCommentByDiscuss } from '~/services/DiscussService';
import { loadCommentByParent } from '~/services/DiscussService';
import PostComment from './PostComment';
const CardComment = ({ comment }) => {
  const editor = useRef(null);
  const [replies, setReplies] = useState([]);
  const [box, setBox] = useState(false);
  const [showReplyButton, setShowReplyButton] = useState(true);
  const [ReplyButton, setReplyButton] = useState(true);
  const printDate = (numbers) => {
    const date = new Date(numbers);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate.replace('at', '');
  };
  const handleReply = (commentId) => {
    setBox(true);
    if (setReplyButton == true) {
      setReplyButton(false);
      setBox(true);
    }
  };
  const handlePostComment = async () => {
    try {
      await handleShowAllReplies();
      setBox(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowAllReplies = async () => {
    try {
      const data = await loadCommentByParent(comment.id);
      setReplies(data);
      if (showReplyButton == true && data != null) {
        setShowReplyButton(false);
      }
      if (box == true && showReplyButton == true) {
        setBox(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.customContainer}>
        <Container style={{ maxWidth: 'initial', width: 'auto' }}>
          <div className={styles['container-content']}>
            <Avatar src={comment.user.urlImage} />
            <Text style={{ marginLeft: '10px', marginTop: '5px', color: '#585F66' }}>{comment.user.fullName}</Text>
            <Text
              style={{ marginLeft: '30px', marginTop: '5px', color: '#2E4964', fontSize: '10px', marginRight: '0.5%' }}
            >
              {comment.id}
            </Text>

            <span style={{ marginLeft: '0px', marginTop: '5px' }}>
              <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
                <path
                  fill-rule="evenodd"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                ></path>
              </svg>
            </span>
            <Text style={{ marginLeft: '30px', marginTop: '5px', color: '#bdbdbd' }}>
              Update At: {printDate(comment.updatedAt)}
            </Text>
          </div>
          <Text style={{ marginLeft: '40px' }}>{comment.text}</Text>
          <Container style={{ marginLeft: '1%', maxWidth: 'initial' }}>
            {replies.map((reply) => (
              <CardComment key={reply.id} comment={reply} />
            ))}
            <div style={{ marginLeft: '1%' }}>
              {box && <PostComment commentParentId={comment.id} onPostComment={handlePostComment} />}
            </div>
          </Container>
        </Container>

        <Container style={{ maxWidth: 'initial', display: 'flex', alignItems: 'center' }}>
          {showReplyButton && (
            <Link style={{ marginLeft: '50px', display: 'flex', alignItems: 'center' }} onClick={handleShowAllReplies}>
              <span style={{ color: '#546e7a' }}>
                <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
                  <path
                    fill-rule="evenodd"
                    d="M8.995 22a.955.955 0 0 1-.704-.282.955.955 0 0 1-.282-.704V18.01H3.972c-.564 0-1.033-.195-1.409-.586A1.99 1.99 0 0 1 2 15.99V3.97c0-.563.188-1.032.563-1.408C2.94 2.188 3.408 2 3.972 2h16.056c.564 0 1.033.188 1.409.563.375.376.563.845.563 1.409V15.99a1.99 1.99 0 0 1-.563 1.432c-.376.39-.845.586-1.409.586h-6.103l-3.709 3.71c-.22.187-.454.281-.704.281h-.517zm.986-6.01v3.1l3.099-3.1h6.948V3.973H3.972V15.99h6.01zm-3.99-9.013h12.018v2.018H5.991V6.977zm0 4.037h9.014v1.972H5.99v-1.972z"
                  ></path>
                </svg>
              </span>

              <span style={{ color: '#546e7a', fontSize: '0.8em', marginLeft: '7px' }}>Show replies</span>
            </Link>
          )}
          {ReplyButton && (
            <Link style={{ marginLeft: '30px', display: 'flex', alignItems: 'center' }} onClick={handleReply}>
              <span>
                <svg viewBox="0 0 24 24" width="1em" height="1em" className="icon__1Md2">
                  <path
                    fillRule="evenodd"
                    d="M21.947 18.144a1 1 0 0 1-1.496 1.18c-3.255-2.193-5.734-3.275-8.556-3.477v4.134a1 1 0 0 1-1.688.726L2.312 13.22a1 1 0 0 1 0-1.451l7.894-7.494A1 1 0 0 1 11.895 5v3.953c3.62.481 7.937 3.52 10.052 9.191zm-6.992-5.851c-1.624-.938-3.31-1.407-5.06-1.407V7.287l-5.422 5.207 5.422 5.203v-3.885c2.696 0 5.644.763 8.843 2.29-1.002-1.52-2.346-2.979-3.783-3.81z"
                  ></path>
                </svg>
              </span>

              <span style={{ color: '#546e7a', fontSize: '0.7em', marginLeft: '7px' }}>Reply</span>
            </Link>
          )}
        </Container>
      </div>
    </>
  );
};

export default CardComment;
