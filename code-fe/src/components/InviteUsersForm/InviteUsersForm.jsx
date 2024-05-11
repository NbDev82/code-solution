import { Box, Divider, Flex, IconButton, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import * as ProblemService from '~/services/ProblemService';
import { ensureMinLoadingDuration } from '~/utils/constants';
import { AddIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import ContestSkeleton from '~/components/Skeletons/ContestSkeleton';
import EmptyListIcon from '~/components/CustomIcons/EmptyListIcon';

const MIN_LOADING_DURATION = 1000;

const InviteUsersForm = ({ curUserId, updateParticipantIds }) => {
  const [searchText, setSearchText] = useState('');
  const [isUsersToAddLoading, setIsUsersToAddLoading] = useState(false);
  const [usersToAdd, setUsersToAdd] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);

  useEffect(() => {
    fetchProblemsToAdd();
  }, [curUserId]);

  const fetchProblemsToAdd = async () => {
    setIsUsersToAddLoading(true);
    const startTime = Date.now();
    try {
      let problemsToAdd = await ProblemService.getProblemsByOwner(curUserId);
      problemsToAdd = filterFetchedProblems(problemsToAdd);
      setUsersToAdd(problemsToAdd);

      await ensureMinLoadingDuration(startTime, MIN_LOADING_DURATION);
    } catch (error) {
      console.error('Error fetching my contests:', error);
      setUsersToAdd([]);
    } finally {
      setIsUsersToAddLoading(false);
    }
  }

  const searchProblems = () => {
    console.log('searching...');
    fetchProblemsToAddWithName(searchText);
  };

  const fetchProblemsToAddWithName = async (name) => {
    setIsUsersToAddLoading(true);
    const startTime = Date.now();
    try {
      let problemsToAdd = await ProblemService.getProblemsByOwnerAndName(curUserId, name);
      problemsToAdd = filterFetchedProblems(problemsToAdd);
      setUsersToAdd(problemsToAdd);

      await ensureMinLoadingDuration(startTime, MIN_LOADING_DURATION);
    } catch (error) {
      console.error('Error fetching my contests:', error);
      setUsersToAdd([]);
    } finally {
      setIsUsersToAddLoading(false);
    }
  };

  const filterFetchedProblems = (newProblems) => {
    const isAddedProblem = (problem) =>
      addedUsers.some(addedProblem => addedProblem.id === problem.id);

    return newProblems.filter(problem => !isAddedProblem(problem));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchProblems();
    }
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const onAddProblemClick = (problemId) => {
    console.log('On onAddProblemClick() method');
    const problemToAdd = usersToAdd.find(problem => problem.id === problemId);

    if (problemToAdd) {
      setAddedUsers(prevAddedProblems => [...prevAddedProblems, problemToAdd]);

      setUsersToAdd(prevProblemsToAdd =>
        prevProblemsToAdd.filter(problem => problem.id !== problemId)
      );
    }

    updateUserIdsWithUsers(addedUsers);
  };

  const onRemoveProblemClick = (problemId) => {
    console.log('On onRemoveProblemClick() method');
    setAddedUsers(prevAddedProblems =>
      prevAddedProblems.filter(problem => problem.id !== problemId)
    );

    const problemToAdd = addedUsers.find(problem => problem.id === problemId);
    if (problemToAdd) {
      setUsersToAdd(prevProblemsToAdd => [...prevProblemsToAdd, problemToAdd]);
    }

    updateUserIdsWithUsers(addedUsers);
  };

  const updateUserIdsWithUsers = (users) => {
    const userIds = users.map(u => u.id);
    updateParticipantIds(userIds);
  }

  return (
    <Box>
      <Box flex="1" textAlign="start">
        <Text fontWeight="bold" noOfLines={1}>
          Add users to invite
        </Text>
      </Box>

      <Flex align="center" gap={6} mt={4}>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search participants..."
            size="lg"
            fontSize="var(--text-size)"
            onChange={handleSearchTextChange}
            onKeyDown={handleKeyDown}
          />
          <InputRightElement
            cursor="pointer"
            onClick={searchProblems}
            children={<SearchIcon color="gray.300" />}
            fontSize="1em"
          />
        </InputGroup>
      </Flex>

      <Box mt={10} height="200px" overflowY="auto">
        {isUsersToAddLoading ? (
          <ContestSkeleton count={5} />
        ) : (
          usersToAdd.map((problem, index) => (
            <Flex
              key={problem.id}
              align="center"
              justifyContent="start"
              mb={4}
            >
              <Box ml={4} flex="1" textAlign="start">
                <Text fontWeight="bold" noOfLines={1} _hover={{ textColor: 'blue.500' }}>
                  {problem.name}
                </Text>
              </Box>

              <Box ml={4} flex="1" textAlign="start">
                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                  Level: {problem.difficultyLevel}
                </Text>
              </Box>

              <Box ml={4} flex="1" textAlign="start">
                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                  Point: {problem.point}
                </Text>
              </Box>

              <Box>
                <IconButton
                  aria-label="Add problem"
                  icon={<AddIcon />}
                  colorScheme="teal"
                  borderRadius="full"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddProblemClick(problem.id);
                  }}
                />
              </Box>
            </Flex>
          ))
        )}
        {(!isUsersToAddLoading && (usersToAdd === null || usersToAdd.length === 0)) && (
          <EmptyListIcon my={20} iconSize={80} />
        )}
      </Box>

      <Divider my={10} />

      <Box mt={10} height="200px" overflowY="auto">
        {(addedUsers === null || addedUsers.length === 0) ? (
          <EmptyListIcon my={20} iconSize={80} />
        ) : (
          addedUsers.map((problem) => (
            <Flex
              key={problem.id}
              align="center"
              justifyContent="space-between"
              mb={4}
            >
              <Box ml={4} flex="1" textAlign="start">
                <Text fontWeight="bold" noOfLines={1} _hover={{ textColor: 'blue.500' }}>
                  {problem.name}
                </Text>
              </Box>

              <Box ml={4} flex="1" textAlign="start">
                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                  Level: {problem.difficultyLevel}
                </Text>
              </Box>

              <Box ml={4} flex="1" textAlign="start">
                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                  Point: {problem.point}
                </Text>
              </Box>

              <Box>
                <IconButton
                  aria-label="Delete problem"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  variant="ghost"
                  cursor="pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveProblemClick(problem.id);
                  }}
                />
              </Box>
            </Flex>
          ))
        )}
      </Box>
    </Box>
  );
}

export default InviteUsersForm;