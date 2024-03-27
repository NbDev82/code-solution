import {
  Box,
  Button,
  Text,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Image,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, SearchIcon, DeleteIcon } from '@chakra-ui/icons';
import { useState, useRef } from 'react';
import { ContestSearchOptions } from '~/utils/constants';

const MyContestList = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [searchText, setSearchText] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [myContests, setMyContests] = useState([
    {
      id: 1,
      ownerId: 2,
      imageUrl: 'https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png',
      title: 'Weekly contest 1',
      desc: 'It is good for practicing',
      startTime: new Date('2024-03-01T07:30:00'),
      endTime: new Date('2024-03-01T10:30:00'),
      duration: 3600,
      type: 'PUBLIC',
      status: 'PREPARING',
      isDeleted: false,
    },
    {
      id: 2,
      ownerId: 3,
      imageUrl: 'https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png',
      title: 'Monthly Contest',
      desc: 'A monthly coding challenge',
      startTime: new Date('2024-04-15T09:00:00'),
      endTime: new Date('2024-04-15T12:00:00'),
      duration: 10800, // 3 hours
      type: 'PUBLIC',
      status: 'ACTIVE',
      isDeleted: false,
    },
    {
      id: 3,
      ownerId: 4,
      imageUrl: 'https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png',
      title: "Beginner's Challenge",
      desc: 'Entry-level programming contest',
      startTime: new Date('2024-05-10T08:00:00'),
      endTime: new Date('2024-05-10T09:00:00'),
      duration: 3600, // 1 hour
      type: 'PRIVATE',
      status: 'COMPLETED',
      isDeleted: false,
    },
  ]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchContests();
    }
  };

  const searchContests = () => {
    console.log('searching...');
  };

  const handleDeleteContest = (contestId) => {
    onOpen();
  };

  const handleConfirmDelete = () => {
    onClose();
  };

  return (
    <Box>
      <Flex align="center" gap={6}>
        <Select value={selectedOption} onChange={handleOptionChange} variant="unstyled" w={'fit-content'}>
          {ContestSearchOptions.map((options) => (
            <option key={options.value} value={options.value}>
              {options.displayName}
            </option>
          ))}
        </Select>

        <InputGroup>
          <Input
            type="text"
            placeholder="Search..."
            size="lg"
            fontSize="var(--text-size)"
            onChange={handleSearchTextChange}
            onKeyDown={handleKeyDown}
          />
          <InputRightElement
            cursor="pointer"
            onClick={searchContests}
            children={<SearchIcon color="gray.300" />}
            fontSize="1em"
          />
        </InputGroup>

        <Button rightIcon={<AddIcon />} colorScheme="teal" variant="outline" borderRadius="full" />
      </Flex>

      {myContests.map((contest) => (
        <Flex key={contest.id} align="center" mt={4}>
          <Image src={contest.imageUrl} alt={contest.title} boxSize="50px" borderRadius="full" />
          <Box ml={4}>
            <Text fontSize="lg" fontWeight="bold">
              {contest.title}
            </Text>
            <Text>Type: {contest.type}</Text>
            <Flex align="center">
              <IconButton
                aria-label="Delete contest"
                icon={<DeleteIcon />}
                colorScheme="red"
                variant="ghost"
                onClick={() => handleDeleteContest(contest.id)}
              />
              <Text ml={2}>{contest.duration} seconds</Text>
            </Flex>
          </Box>
        </Flex>
      ))}

      <AlertDialog motionPreset="scale" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader fontWeight="bold">Delete?</AlertDialogHeader>
          <AlertDialogBody>Are you sure you want to delete the contest</AlertDialogBody>
          <AlertDialogFooter gap={2}>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleConfirmDelete}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default MyContestList;
