import React,{useContext} from 'react';
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
  IconButton,
  Button,
} from '@chakra-ui/react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {ProblemContext} from '~/pages/SubmitCode/SubmitCodeScreen'

const CommentCard = (props) => {
  const user = useContext(ProblemContext);
  const comment = props.comment;
  return (
    <Card w={props.w} borderRadius="var(--radius-size-small)" boxShadow={'var(--box-shadow)'}>
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={user.fullName} src={user.avatarSrc} />
            <Box>
              <Heading size="sm" fontFamily="var(--font-family)">
                {user.fullName}
              </Heading>
            </Box>
          </Flex>
          <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" icon={<MoreVertIcon />} />
        </Flex>
      </CardHeader>
      <CardBody >
        <Text textAlign='center'>{comment.content}</Text>
      </CardBody>

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Button flex="1" variant="ghost" leftIcon={<CreateOutlinedIcon />}>
          Edit
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<DeleteOutlineOutlinedIcon />}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

CommentCard.propTypes = {
  w: PropTypes.string,
  user: PropTypes.object,
  comment: PropTypes.object,
};

CommentCard.defaultProps = {
  w: '100%',
  comment: {
    id: '',
    content: '',
    like: 0
  },
};

export default CommentCard;
