import React, { useContext, useState, useEffect } from 'react';
import { VStack, HStack, Button } from '@chakra-ui/react';
import './DiscussesScreen.scss';
import CommentCard from '../Cards/CommentCard';
import { ProblemContext } from '~/context/Problem';
import { COMMENTS_SAMPLE } from '~/utils/Const';
import { AddIcon } from '@chakra-ui/icons';
import InputEmoji from 'react-input-emoji';
import { getComments, addComment } from '~/services/CommentService';
import Lottie from 'react-lottie';
import Loading from '~/assets/lotties/Loading';
import { DEFAULT_LOTTIE_OPTIONS } from '~/utils/Const';
import queryString from 'query-string';
const DiscussesScreen = () => {
  const { user, problem } = useContext(ProblemContext);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const fetchComments = async () => {
    try {
      const response = await getComments(queryString.stringify({ problemId: problem.id }));
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  const handleNewComment = async (text) => {
    const comment = {
      id: 0,
      text: text,
      updatedAt: new Date().toISOString(),
      userName: user.fullName,
      emoji: {
        name: '',
        emoji: '',
      },
      emojiQuantity: 0,
      replyComments: [],
    };
    try {
      setIsWaiting(true);
      const response = await addComment(comment);
      if (response.data) {
        setIsAdding(false);
        setIsWaiting(false);
        fetchComments();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      return error.response?.data?.message;
    }
  };

  return (
    <VStack spacing={5} padding={5} className="discuss__layout">
      <HStack className="discuss_toolbar">
        <Button className="button__icon" rightIcon={<AddIcon></AddIcon>} onClick={() => setIsAdding(true)}>
          New Comment
        </Button>
      </HStack>

      {isAdding ? (
        <>
          <InputEmoji
            value={commentText}
            onChange={setCommentText}
            cleanOnEnter
            onEnter={handleNewComment}
            placeholder="Type a message"
          ></InputEmoji>
          <Button colorScheme="red" variant="link" onClick={() => setIsAdding(false)}>
            cancel
          </Button>
        </>
      ) : (
        <></>
      )}
      {isWaiting ? (
        <Lottie options={{ ...DEFAULT_LOTTIE_OPTIONS, animationData: Loading }} height={50} width={50} />
      ) : (
        <br></br>
      )}
      {comments.map((comment, index) => (
        <CommentCard key={index} comment={comment} w="95%"></CommentCard>
      ))}
    </VStack>
  );
};

export default DiscussesScreen;
