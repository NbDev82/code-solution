import  React,{useContext} from 'react';
import { VStack } from '@chakra-ui/react';
import './DiscussesScreen.scss';
import CommentEditText from '~/components/DiscussesProblem/CommentEditText/CommentEditText';
import CommentCard from '../Cards/CommentCard';
import {ProblemContext} from '~/context/Problem'


 const DiscussesScreen = () => {
  const {user} = useContext(ProblemContext)
  return (
    <div>   
      <VStack spacing={2} className="discuss__layout">
        <CommentCard user={user}></CommentCard>
      </VStack>
      <CommentEditText />
    </div>
  );
}

export default DiscussesScreen;