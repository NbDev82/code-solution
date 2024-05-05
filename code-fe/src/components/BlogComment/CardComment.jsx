import { Image } from '@chakra-ui/react';
import { Avatar, Text, Container, Button } from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';
import styles from './BlogComment.module.scss';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loadCommentByDiscuss } from '~/services/DiscussService';

const CardComment = (props) => {
  const editor = useRef(null);
  const [listComment, setListComment] = useState([]);

  const handleReply = (commentId) => {
    // Handle reply functionality
  };

  const handleShowAllReplies = (commentId) => {
    // Handle show/hide all replies functionality
  };

  const loadComment = async () => {
    try {
      debugger;
      const data = await loadCommentByDiscuss(props.postId);
      setListComment(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadComment();
  }, [props.postId]);

  return (
    <>
      {listComment.map((comment) => (
        <div className={styles.customContainer} key={comment.id}>
          <Avatar src={comment.user.urlImage} alt={comment.username} />
          <Container>
            <Text>{comment.user.fullName}</Text>
            <Text>{comment.text}</Text>
          </Container>
          <Text>{comment.updatedAt}</Text>
          <Text>{comment.content}</Text>
          <Container>
            <Button>
              <svg viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M7 14l5-5 5 5z" />
              </svg>
            </Button>
            <Text>{comment.voteCount}</Text>
            <Button>
              <svg viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M7 10l5 5 5-5z" />
              </svg>
            </Button>
          </Container>
          {/* Render các thành phần UI bổ sung hoặc câu trả lời ở đây */}
        </div>
      ))}
    </>
  );
};

CardComment.propTypes = {
  postId: PropTypes.number,
};

export default CardComment;
