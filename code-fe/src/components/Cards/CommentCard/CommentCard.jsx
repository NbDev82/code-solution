import React, { useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
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
  Collapse,
  useDisclosure,
  HStack,
  VStack,
} from '@chakra-ui/react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import EmojiComment from '~/components/Emoji/EmojiComment';
import style from './CommentCart.module.scss';
import InputEmoji from 'react-input-emoji';
import { getCurrentUserDetail } from '~/auth';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Lottie from 'react-lottie';
import Loading from '~/assets/lotties/Loading';
import { DEFAULT_LOTTIE_OPTIONS } from '~/utils/Const';
import { replyComment, deleteComment, updateComment } from '~/services/CommentService';
const CommentCard = (props) => {
  const [user, setUser] = useState(getCurrentUserDetail());
  const [comment, setComment] = useState(props.comment);
  let [replyText, setReplyText] = useState('');
  const [chosenEmoji, setChosenEmoji] = useState(props.comment.emoji);
  const handleEmojiClick = (emoji) => {
    setChosenEmoji(emoji);
  };
  const [editText, setEditText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const { isOpen, onToggle } = useDisclosure();

  const handleOnEnter = async (text) => {
    const updatedComment = { ...comment };
    const reply = {
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
      const response = await replyComment(reply);
      if (response.data) {
        setIsWaiting(false);
        updatedComment.replyComments.push(reply);
        setComment(updatedComment);
      }
    } catch (error) {
      console.error('Error reply comment:', error);
      return error.response?.data?.message;
    }
  };

  const handleDeleteComment = async () => {
    try {
      setIsWaiting(true);
      const response = await deleteComment(comment);
      if (response.data) {
        setIsWaiting(false);
        window.location.reload(true);
      }
    } catch (error) {
      console.error('Error delete comment:', error);
    }
  };

  const handleUpdateComment = async (text) => {
    const updatedComment = { ...comment };
    try {
      const response = await updateComment(updateComment);
      if (response.data) {
        setIsEditing(false);
        updatedComment.text = text;
        updateComment.updateAt = new Date().toISOString();
        setComment(updatedComment);
      }
    } catch (error) {
      console.error('Error update comment:', error);
      return error.response?.data?.message;
    }
  };

  return (
    <div className={style.container}>
      {!isEditing ? (
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
              <Popover>
                <PopoverTrigger>
                  <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" icon={<MoreVertIcon />} />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverBody>
                    <VStack justifyContent="space-around" alignItems="center">
                      <Button
                        className={style.button__icon}
                        variant="ghost"
                        rightIcon={<EditOutlinedIcon></EditOutlinedIcon>}
                        onClick={() => {
                          setIsEditing(true);
                          setEditText(comment.text);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        className={style.button__icon}
                        variant="ghost"
                        onClick={handleDeleteComment}
                        rightIcon={<DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>}
                      >
                        Remove
                      </Button>
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
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
              {chosenEmoji.emoji !== '' && chosenEmoji.emoji__name !== '' ? (
                <Button h="40px" bg="transparent" _hover={{ bg: 'transparent', transform: 'Scale(1.05)' }}>
                  <span className={style.emoji}>{chosenEmoji.emoji}</span>
                  <span className={style.emoji__name_active}>
                    {chosenEmoji.name}
                    {' ('}
                    {comment.emojiQuantity}
                    {')'}
                  </span>
                </Button>
              ) : (
                <Button
                  h="40px"
                  bg="transparent"
                  _hover={{ bg: 'transparent', transform: 'Scale(1.05)' }}
                  leftIcon={
                    <FavoriteBorderRoundedIcon
                      sx={{ fontSize: '18px', color: 'var(--gray)' }}
                    ></FavoriteBorderRoundedIcon>
                  }
                >
                  <span className={style.emoji__name}>
                    Love
                    {' ('}
                    {comment.emojiQuantity}
                    {')'}
                  </span>
                </Button>
              )}
            </EmojiComment>
            {comment.replyComments.length > 0 ? (
              <Button
                onClick={onToggle}
                fontSize="14px"
                h="40px"
                bg="transparent"
                _hover={{ bg: 'transparent', transform: 'Scale(1.05)' }}
                leftIcon={<ChatBubbleOutlineOutlinedIcon sx={{ fontSize: '18px', color: 'var(--secondary-color)' }} />}
              >
                <span className={style.emoji__name_active}>
                  Comment
                  {' ('}
                  {comment.replyComments.length}
                  {')'}
                </span>
              </Button>
            ) : (
              <Button
                onClick={onToggle}
                fontSize="14px"
                h="40px"
                bg="transparent"
                _hover={{ bg: 'transparent', transform: 'Scale(1.05)' }}
                leftIcon={<ChatBubbleOutlineOutlinedIcon sx={{ fontSize: '18px', color: 'var(--gray)' }} />}
              >
                <span className={style.emoji__name}>
                  Comment
                  {' ('}
                  {comment.replyComments.length}
                  {')'}
                </span>
              </Button>
            )}
          </CardFooter>
        </Card>
      ) : (
        <div className={style.reply}>
          <InputEmoji
            value={editText}
            onChange={setEditText}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Type a message"
          ></InputEmoji>
          <Button colorScheme="red" variant="link" onClick={() => setIsEditing(false)}>
            cancel
          </Button>
        </div>
      )}

      <Collapse in={isOpen} animateOpacity>
        <HStack
          className={style.replies}
          boxShadow={'var(--box-shadow-small)'}
          color="var(--secondary-color)"
          bg="var(--gray-light)"
          justifyContent="start"
          alignItems="start"
          padding="10px"
          h={comment.replyComments.length * 200 + 'px'}
          overflow="auto"
        >
          {comment.replyComments.length !== 0 ? <div className={style.divider} /> : <></>}
          <VStack spacing={1} align="stretch" w="100%" padding={0}>
            {comment.replyComments.map((comment, index) => (
              <CommentCard key={index} comment={comment}></CommentCard>
            ))}

            {isWaiting ? (
              <Lottie options={{ ...DEFAULT_LOTTIE_OPTIONS, animationData: Loading }} height={50} width={50} />
            ) : (
              <br></br>
            )}
            <div className={style.reply}>
              <InputEmoji
                value={replyText}
                onChange={() => setReplyText()}
                cleanOnEnter
                onEnter={handleUpdateComment}
                placeholder="Type a message"
              ></InputEmoji>
            </div>
          </VStack>
        </HStack>
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

export default React.memo(CommentCard);
