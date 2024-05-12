import { Box, Divider, Flex, IconButton, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import * as ProblemService from '~/services/ProblemService';
import * as UserService from '~/services/UserService';
import { ensureMinLoadingDuration } from '~/utils/constants';
import { AddIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import ContestSkeleton from '~/components/Skeletons/ContestSkeleton';
import EmptyListIcon from '~/components/CustomIcons/EmptyListIcon';
import { getUsersByNameExcludingCurrentUser, getUsersExcludingCurrentUser } from '~/services/UserService';

const MIN_LOADING_DURATION = 1000;

const InviteUsersForm = ({ curUserId, updateParticipantIds }) => {
  const [searchText, setSearchText] = useState('');
  const [isUsersToAddLoading, setIsUsersToAddLoading] = useState(false);
  const [usersToAdd, setUsersToAdd] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);

  useEffect(() => {
    fetchUsersToAdd();
  }, [curUserId]);

  const fetchUsersToAdd = async () => {
    setIsUsersToAddLoading(true);
    const startTime = Date.now();
    try {
      let usersToAdd = await UserService.getUsersExcludingCurrentUser(curUserId);
      usersToAdd = filterFetchedUsers(usersToAdd);
      setUsersToAdd(usersToAdd);

      await ensureMinLoadingDuration(startTime, MIN_LOADING_DURATION);
    } catch (error) {
      console.error('Error fetching my contests:', error);
      setUsersToAdd([]);
    } finally {
      setIsUsersToAddLoading(false);
    }
  }

  const searchUsers = () => {
    console.log('searching...');
    fetchUsersToAddWithName(searchText);
  };

  const fetchUsersToAddWithName = async (name) => {
    setIsUsersToAddLoading(true);
    const startTime = Date.now();
    try {
      let usersToAdd = await UserService.getUsersByNameExcludingCurrentUser(name, curUserId);
      usersToAdd = filterFetchedUsers(usersToAdd);
      setUsersToAdd(usersToAdd);

      await ensureMinLoadingDuration(startTime, MIN_LOADING_DURATION);
    } catch (error) {
      console.error('Error fetching my contests:', error);
      setUsersToAdd([]);
    } finally {
      setIsUsersToAddLoading(false);
    }
  };

  const filterFetchedUsers = (newUsers) => {
    const isAddedProblem = (user) =>
      addedUsers.some(addedProblem => addedProblem.id === user.id);

    return newUsers.filter(user => !isAddedProblem(user));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchUsers();
    }
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const onAddProblemClick = (userId) => {
    console.log('On onAddProblemClick() method');
    const userToAdd = usersToAdd.find(user => user.id === userId);

    if (userToAdd) {
      setAddedUsers(prevAddedUsers => [...prevAddedUsers, userToAdd]);

      setUsersToAdd(prevUsersToAdd =>
        prevUsersToAdd.filter(user => user.id !== userId)
      );
    }

    updateUserIdsWithUsers(addedUsers);
  };

  const onRemoveProblemClick = (userId) => {
    console.log('On onRemoveProblemClick() method');
    setAddedUsers(prevAddedUsers =>
      prevAddedUsers.filter(user => user.id !== userId)
    );

    const userToAdd = addedUsers.find(user => user.id === userId);
    if (userToAdd) {
      setUsersToAdd(prevUsersToAdd => [...prevUsersToAdd, userToAdd]);
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
            onClick={searchUsers}
            children={<SearchIcon color="gray.300" />}
            fontSize="1em"
          />
        </InputGroup>
      </Flex>

      <Box mt={10} height="200px" overflowY="auto">
        {isUsersToAddLoading ? (
          <ContestSkeleton count={5} />
        ) : (
          usersToAdd.map((user, index) => (
            <Flex
              key={user.id}
              align="center"
              justifyContent="start"
              mb={4}
            >
              <Box ml={4} flex="1" textAlign="start">
                <Text fontWeight="bold" noOfLines={1} _hover={{ textColor: 'blue.500' }}>
                  {user.name}
                </Text>
              </Box>

              <Box ml={4} flex="1" textAlign="start">
                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                  Level: {user.difficultyLevel}
                </Text>
              </Box>

              <Box ml={4} flex="1" textAlign="start">
                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                  Point: {user.point}
                </Text>
              </Box>

              <Box>
                <IconButton
                  aria-label="Add user"
                  icon={<AddIcon />}
                  colorScheme="teal"
                  borderRadius="full"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddProblemClick(user.id);
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
          addedUsers.map((user) => (
            <Flex
              key={user.id}
              align="center"
              justifyContent="space-between"
              mb={4}
            >
              <Box ml={4} flex="1" textAlign="start">
                <Text fontWeight="bold" noOfLines={1} _hover={{ textColor: 'blue.500' }}>
                  {user.name}
                </Text>
              </Box>

              <Box ml={4} flex="1" textAlign="start">
                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                  Level: {user.difficultyLevel}
                </Text>
              </Box>

              <Box ml={4} flex="1" textAlign="start">
                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                  Point: {user.point}
                </Text>
              </Box>

              <Box>
                <IconButton
                  aria-label="Delete user"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  variant="ghost"
                  cursor="pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveProblemClick(user.id);
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