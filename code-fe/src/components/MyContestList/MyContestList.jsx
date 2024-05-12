import {
  Box,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { ensureMinLoadingDuration, formatDuration } from '~/utils/constants';
import SimplePagination from '~/components/Pagination/SimplePagination';
import { myDemoContests } from '~/utils/demoContestData';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import ContestService from '~/services/ContestService';
import ContestSkeleton from '../Skeletons/ContestSkeleton';
import EmptyListIcon from '~/components/CustomIcons/EmptyListIcon';
import { DIALOG_DEFAULT_PROPS } from '~/utils/Const';
import Dialog from '~/components/Dialog';

const MIN_LOADING_DURATION = 1000;

const MyContestList = ({ curUserId }) => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [isContestsLoading, setIsContestsLoading] = useState(false);
  const [myContests, setMyContests] = useState(myDemoContests);
  const [dialogMsg, setDialogMsg] = useState('');
  const [dialogProps, setDialogProps] = useState({ ...DIALOG_DEFAULT_PROPS, msg: dialogMsg });
  const toast = useToast();

  useEffect(() => {
    fetchMyContests();
  }, [curUserId, currentPage]);

  const fetchMyContests = async () => {
    setIsContestsLoading(true);
    const startTime = Date.now();
    try {
      const contests = await ContestService.getMyContests(curUserId, currentPage, 10);
      setMyContests(contests);
      console.log(contests);

      await ensureMinLoadingDuration(startTime, MIN_LOADING_DURATION);
    } catch (error) {
      console.error('Error fetching my contests:', error);
      setMyContests([]);
    } finally {
      setIsContestsLoading(false);
    }
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

    console.log(searchText);
    fetchMyContestsByTitle(searchText);
  };

  const fetchMyContestsByTitle = async (title) => {
    setIsContestsLoading(true);
    const startTime = Date.now();
    try {
      const contests = await ContestService.getMyContestsByTitle(curUserId, title);
      setMyContests(contests);

      await ensureMinLoadingDuration(startTime, MIN_LOADING_DURATION);
    } catch (error) {
      console.error('Error fetching my contests:', error);
      setMyContests([]);
    } finally {
      setIsContestsLoading(false);
    }
  };

  const onClickDeleteBtn = (contestId) => {
    let msg = 'Are you sure want to delete the contest?';
    setDialogProps((prev) => ({
      ...prev,
      msg: msg,
      isOpen: true,
      onYesClick: () => {
        ContestService.deleteContest(contestId)
          .then(result => {
            if (result) {
              toast({
                title: `Add contest successfully`,
                position: 'top-right',
                status: 'success',
                isClosable: true,
              })

              setMyContests(prevContests => prevContests.filter(contest =>
                  contest.id !== contestId));
            } else {
              toast({
                title: `Add contest unsuccessfully`,
                position: 'top-right',
                status: 'error',
                isClosable: true,
              })
            }
          })
      }
    }));
  };

  const onClickContestItem = (curContest) => {
    console.log('On onClickContestItem() method');

    navigate(config.routes.update_contest, {
      state: { curContest }
    });
  };

  const onClickAddBtn = () => {
    navigate(config.routes.add_contest);
  };

  return (
    <Box>
      <Flex align="center" gap={6} mt={2}>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search by title..."
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
          onClick={() => onClickAddBtn()}
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
              onClick={() => onClickContestItem(contest)}
            >
              <Box>
                <Image src={"https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png"} alt={contest.title} width="124px" height="60px" borderRadius="xl" />
              </Box>
              <Box ml={4} flex="1" textAlign="start">
                <Text fontWeight="bold" noOfLines={1} _hover={{ textColor: 'blue.500' }}>
                  {contest.title}
                </Text>
                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                  Duration: {formatDuration(contest.durationInMillis)}
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
                    onClickDeleteBtn(contest.id);
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

      <Dialog dialogProps={dialogProps} setDialogProps={setDialogProps}></Dialog>
    </Box>
  );
};

export default MyContestList;
