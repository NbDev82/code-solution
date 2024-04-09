import React from 'react';
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
  Image,
  Button,
} from '@chakra-ui/react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const ProblemCard = (props) => {
  const user = props.user;
  const problem = props.problem;
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
              <Text>{problem.title}</Text>
            </Box>
          </Flex>
          <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" icon={<MoreVertIcon />} />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text></Text>
      </CardBody>
      <Image
        objectFit="cover"
        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Chakra UI"
      />

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Button flex="1" variant="ghost" leftIcon={<ChatBubbleOutlineOutlinedIcon />}>
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<CreateOutlinedIcon />}>
          Comment
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<DeleteOutlineOutlinedIcon />}>
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

ProblemCard.propTypes = {
  w: PropTypes.string,
  user: PropTypes.object,
  problem: PropTypes.object,
};

ProblemCard.defaultProps = {
  w: '100%',
  user: {
    id: '',
    fullName: 'User',
    phoneNumber: '',
    dateOfBirth: '',
    email: '',
    avatarSrc: '',
  },
  problem: {
    id: '',
    title: '',
    status: '',
    acceptance: 0,
    difficulty: '',
    topics: [],
  },
};

export default ProblemCard;
