import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Box,
  Avatar,
  Heading,
  Text,
  Button,
  IconButton,
  Divider,
  Collapse,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ChatIcon } from '@chakra-ui/icons';
import EmojiComment from '~/components/Emoji/EmojiComment';
import style from './CommentCart.module.scss';

const CommentCard = (props) => {
  const comment = props.comment;
  const [chosenEmoji, setChosenEmoji] = useState(props.comment.emoji);
  const handleEmojiClick = (emoji) => {
    setChosenEmoji(emoji);
  };
  const { isOpen, onToggle } = useDisclosure();

  return (
    <div className={style.container}>
      <Card>
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" justifyContent="start" flexWrap="wrap">
              <Avatar name={comment.userName} src="" />
              <Box>
                <Heading size="md" fontFamily="var(--font-family)">
                  {comment.userName}
                </Heading>
                <Text as="sup">{comment.updateAt}</Text>
              </Box>
            </Flex>
            <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" icon={<MoreVertIcon />} />
          </Flex>
        </CardHeader>
        <CardBody padding={0}>
          <Text padding=" 0 5%" noOfLines={1} textAlign="left">
            {comment.text}
          </Text>
        </CardBody>

        <CardFooter
          justifyContent="space-around"
          flexWrap="wrap"
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <EmojiComment onSelectEmoji={handleEmojiClick}>
            <Button h="40px" bg="transparent" _hover={{ bg: 'transparent', transform: 'Scale(1.05)' }}>
              <span className={style.emoji}>{chosenEmoji.emoji}</span>
              <span className={style.emoji__name}>
                {' '}
                {chosenEmoji.name}
                {' ('}
                {comment.emojiQuantity}
                {')'}
              </span>
            </Button>
          </EmojiComment>

          <Button
            onClick={onToggle}
            fontSize="14px"
            h="40px"
            bg="transparent"
            _hover={{ bg: 'transparent', transform: 'Scale(1.05)' }}
            leftIcon={<ChatIcon />}
          >
            Comment{' ('}
            {comment.replyComments.length}
            {')'}
          </Button>
        </CardFooter>
      </Card>
      <Collapse in={isOpen} animateOpacity>
        <Box
          className={style.replies}
          boxShadow={'var(--box-shadow-small)'}
          color="var(--secondary-color)"
          bg="var(--gray-light)"
        >
          {comment.replyComments.map((comment) => (
            <HStack key={comment.id} spacing={1} align="stretch">
              <div className={style.divider}></div>
              <CommentCard comment={comment}></CommentCard>
            </HStack>
          ))}
          <br></br>
        </Box>
      </Collapse>
    </div>
  );
};

CommentCard.propTypes = {
  w: PropTypes.string,
  comment: PropTypes.object,
};

CommentCard.defaultProps = {
  w: '100%',
  comment: {
    id: 0,
    text: '',
    updateAt: '',
    userName: '',
    emoji: {
      name: '',
      emoji: '',
    },
    emojiQuantity: 0,
    replyComments: [],
  },
};

export default CommentCard;
