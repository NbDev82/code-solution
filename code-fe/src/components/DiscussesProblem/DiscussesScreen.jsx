import React, { useContext, useState } from 'react';
import { VStack } from '@chakra-ui/react';
import './DiscussesScreen.scss';
import CommentCard from '../Cards/CommentCard';
import { ProblemContext } from '~/context/Problem';
import { COMMENTS_SAMPLE } from '~/utils/Const';

const DiscussesScreen = () => {
  const { user } = useContext(ProblemContext);
  const [comments, setComments] = useState(COMMENTS_SAMPLE);
  return (
    <VStack spacing={5} padding={5} className="discuss__layout">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} w="95%"></CommentCard>
      ))}
    </VStack>
  );
};

export default DiscussesScreen;
