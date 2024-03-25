import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import { useEffect, useRef, useState } from 'react';
import { ContestSearchOptions, formatDateTime, formatDuration } from '~/utils/constants';
import SimplePagination from '~/components/Pagination/SimplePagination';

const MyContestList = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [searchText, setSearchText] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [myContests, setMyContests] = useState([
    {
      id: 1,
      ownerId: 2,
      imageUrl: 'https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png',
      title: 'Weekly contest 1',
      desc: 'It is good for practicing',
      startTime: new Date('2024-03-01T07:30:00'),
      endTime: new Date('2024-03-01T10:30:00'),
      duration: 3661000,
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
      duration: 600000, // 3 hours
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
      duration: 3540000, // 1 hour
      type: 'PRIVATE',
      status: 'COMPLETED',
      isDeleted: false,
    },
    {
      id: 4,
      ownerId: 4,
      imageUrl: 'https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png',
      title: "Beginner's Challenge",
      desc: 'Entry-level programming contest',
      startTime: new Date('2024-05-10T08:00:00'),
      endTime: new Date('2024-05-10T09:00:00'),
      duration: 3540000, // 1 hour
      type: 'PRIVATE',
      status: 'COMPLETED',
      isDeleted: false,
    },
    {
      id: 5,
      ownerId: 4,
      imageUrl: 'https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png',
      title: "Beginner's Challenge",
      desc: 'Entry-level programming contest',
      startTime: new Date('2024-05-10T08:00:00'),
      endTime: new Date('2024-05-10T09:00:00'),
      duration: 3540000, // 1 hour
      type: 'PRIVATE',
      status: 'COMPLETED',
      isDeleted: false,
    },
    {
      id: 6,
      ownerId: 4,
      imageUrl: 'https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png',
      title: "Beginner's Challenge",
      desc: 'Entry-level programming contest',
      startTime: new Date('2024-05-10T08:00:00'),
      endTime: new Date('2024-05-10T09:00:00'),
      duration: 3540000, // 1 hour
      type: 'PRIVATE',
      status: 'COMPLETED',
      isDeleted: false,
    },
    {
      id: 7,
      ownerId: 4,
      imageUrl: 'https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png',
      title: "Beginner's Challenge",
      desc: 'Entry-level programming contest',
      startTime: new Date('2024-05-10T08:00:00'),
      endTime: new Date('2024-05-10T09:00:00'),
      duration: 3540000, // 1 hour
      type: 'PRIVATE',
      status: 'COMPLETED',
      isDeleted: false,
    },
    {
      id: 8,
      ownerId: 4,
      imageUrl: 'https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png',
      title: "Beginner's Challenge",
      desc: 'Entry-level programming contest',
      startTime: new Date('2024-05-10T08:00:00'),
      endTime: new Date('2024-05-10T09:00:00'),
      duration: 3540000, // 1 hour
      type: 'PRIVATE',
      status: 'COMPLETED',
      isDeleted: false,
    },
  ]);

  useEffect(() => {
    console.log('Page changed');
  }, [currentPage]);

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

  const handleClickContest = (contestId) => {
    console.log("On handleClickContest() method")
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

        <IconButton
          aria-label="Add contest"
          icon={<AddIcon />}
          colorScheme="teal"
          borderRadius="full"
          variant="outline"
        />
      </Flex>

      <Box mt={10}>
        {myContests.map((contest) => (
          <Flex
            key={contest.id}
            align="center"
            justifyContent="space-between"
            mb={4}
            cursor="pointer"
            onClick={() => handleClickContest(contest.id)}
          >
            <Box>
              <Image src={contest.imageUrl} alt={contest.title} width="124px" height="60px" borderRadius="xl" />
            </Box>
            <Box ml={4} flex="1" textAlign="start">
              <Text fontWeight="bold" noOfLines={1} _hover={{ textColor: 'blue.500' }}>
                {contest.title}
              </Text>
              <Text fontSize="xs" color="gray.600" noOfLines={1} mb={-2}>
                {`${formatDateTime(contest.startTime)} - ${formatDateTime(contest.endTime)}`}
              </Text>
              <Text fontSize="xs" color="gray.600" noOfLines={1}>
                Duration: {formatDuration(contest.duration)}
              </Text>
            </Box>

            <Box>
              <Badge variant="subtle" borderRadius="md" color="purple.400" px={4} me={10}>
                {contest.type}
              </Badge>

              <IconButton
                aria-label="Delete contest"
                icon={<DeleteIcon />}
                colorScheme="red"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteContest(contest.id);
                }}
              />
            </Box>
          </Flex>
        ))}
      </Box>

      <Box mt={10}>
        <SimplePagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </Box>

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
