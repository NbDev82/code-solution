import { Box, Divider, Flex, IconButton, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import * as UserService from '~/services/UserService';
import { ensureMinLoadingDuration } from '~/utils/constants';
import { AddIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import ContestSkeleton from '~/components/Skeletons/ContestSkeleton';
import EmptyListIcon from '~/components/CustomIcons/EmptyListIcon';
import { getUsersByNameExcludingCurrentUser, getUsersExcludingCurrentUser } from '~/services/UserService';
import ContestEnrollmentService from "~/services/ContestEnrollmentService";

const MIN_LOADING_DURATION = 1000;

const InviteUsersForm = ({ curUserId, curContestId }) => {
  const [searchText, setSearchText] = useState('');
  const [isUsersToAddLoading, setIsUsersToAddLoading] = useState(false);
  const [usersToInvite, setUsersToInvite] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchParticipants();
    fetchUsersToAdd();
  }, [curUserId]);

  const fetchParticipants = async () => {
    try {
      let usersToAdd = await ContestEnrollmentService.getParticipantsByContest(curUserId);
      setParticipants(usersToAdd);
    } catch (error) {
      console.error('Error fetching my contests:', error);
      setParticipants([]);
    }
  }

  const fetchUsersToAdd = async () => {
    setIsUsersToAddLoading(true);
    const startTime = Date.now();
    try {
      let usersToAdd = await ContestEnrollmentService.getUsersToInviteByName(curContestId, curUserId);
      setUsersToInvite(usersToAdd);

      await ensureMinLoadingDuration(startTime, MIN_LOADING_DURATION);
    } catch (error) {
      console.error('Error fetching my contests:', error);
      setUsersToInvite([]);
    } finally {
      setIsUsersToAddLoading(false);
    }
  };

  const searchUsers = () => {
    console.log('searching...');
    fetchUsersToInviteByName(searchText);
  };

  const fetchUsersToInviteByName = async (nameToSearch) => {
    setIsUsersToAddLoading(true);
    const startTime = Date.now();
    try {
      let usersToAdd = await ContestEnrollmentService.getUsersToInviteByName(curUserId, nameToSearch);
      setUsersToInvite(usersToAdd);

      await ensureMinLoadingDuration(startTime, MIN_LOADING_DURATION);
    } catch (error) {
      console.error('Error fetching my users:', error);
      setUsersToInvite([]);
    } finally {
      setIsUsersToAddLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchUsers();
    }
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const onInviteUserClick = (userId) => {
    console.log('On onInviteUserClick() method');
    const userToInvite = usersToInvite.find((user) => user.id === userId);

    if (userToInvite && ContestEnrollmentService.inviteUser(curContestId, userId)) {
      setParticipants((prevAddedUsers) => [...prevAddedUsers, userToInvite]);
      setUsersToInvite((prevUsersToAdd) => prevUsersToAdd.filter((user) => user.id !== userId));
    }
  };

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
          usersToInvite.map((user, index) => (
            <Flex key={user.id} align="center" justifyContent="start" mb={4}>
              <Box ml={4} flex="1" textAlign="start">
                <Text fontWeight="bold" noOfLines={1} _hover={{ textColor: 'blue.500' }}>
                  {user.fullName}
                </Text>
              </Box>

              <Box ml={4} flex="1" textAlign="start">
                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                  Email: {user.email}
                </Text>
              </Box>

              <Box ml={4} flex="1" textAlign="start">
                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                  Phone number: {user.phoneNumber}
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
                    onInviteUserClick(user.id);
                  }}
                />
              </Box>
            </Flex>
          ))
        )}
        {!isUsersToAddLoading && (usersToInvite === null || usersToInvite.length === 0) && (
          <EmptyListIcon my={20} iconSize={80} />
        )}
      </Box>

      <Divider my={10} />

      <Box mt={10} height="200px" overflowY="auto">
        {participants === null || participants.length === 0 ? (
          <EmptyListIcon my={20} iconSize={80} />
        ) : (
          participants.map((user) => (
            <Flex key={user.id} align="center" justifyContent="space-between" mb={4}>
              <Box ml={4} flex="1" textAlign="start">
                <Text fontWeight="bold" noOfLines={1} _hover={{ textColor: 'blue.500' }}>
                  {user.fullName}
                </Text>
              </Box>

              <Box ml={4} flex="1" textAlign="start">
                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                  Email: {user.email}
                </Text>
              </Box>

              <Box ml={4} flex="1" textAlign="start">
                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                  Phone number: {user.phoneNumber}
                </Text>
              </Box>
            </Flex>
          ))
        )}
      </Box>
    </Box>
  );
};

export default InviteUsersForm;
