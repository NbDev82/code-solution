import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button, Center,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { ContestSearchOptions, ensureMinLoadingDuration, formatDateTime, formatDuration } from '~/utils/constants';
import SimplePagination from '~/components/Pagination/SimplePagination';
import { myDemoContests } from '~/utils/demoContestData';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import ContestService from '~/services/ContestService';
import ContestSkeleton from '../Skeletons/ContestSkeleton';
import EmptyList from '~/assets/images/EmptyList.svg';
import EmptyListIcon from '~/components/CustomIcons/EmptyListIcon';

const MIN_LOADING_DURATION = 1000;

const MyContestList = ({ curUserId }) => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState('');
  const [searchText, setSearchText] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [isContestsLoading, setIsContestsLoading] = useState(false);
  const [myContests, setMyContests] = useState(myDemoContests);

  useEffect(() => {
    fetchContests();
  }, [curUserId, currentPage]);

  const fetchContests = async () => {
    setIsContestsLoading(true);
    const startTime = Date.now();
    try {
      const contests = await ContestService.getMyContests(curUserId, currentPage, 10);
      setMyContests(contests);

      await ensureMinLoadingDuration(startTime, MIN_LOADING_DURATION);
    } catch (error) {
      console.error('Error fetching my contests:', error);
      setMyContests([]);
    } finally {
      setIsContestsLoading(false);
    }
  };

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
    console.log('On handleClickContest() method');
  };

  const handleAddContest = () => {
    navigate(config.routes.add_contest);
  };

  return (
    <Box>
      <Flex align="center" gap={6} mt={2}>
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
          onClick={() => handleAddContest()}
        />
      </Flex>

      <Box mt={10}>
        {isContestsLoading ? (
          <ContestSkeleton count={5} />
        ) : (
          myContests.map((contest) => (
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
                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                  Duration: {formatDuration(contest.duration)}
                </Text>
              </Box>

              <Box>
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
          ))
        )}
        {(myContests === null || myContests.length === 0) && (
          <EmptyListIcon my={150} />
        )}
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
