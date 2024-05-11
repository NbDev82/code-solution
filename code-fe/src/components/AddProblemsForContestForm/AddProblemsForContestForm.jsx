import { Box, Flex, Input, InputGroup, InputRightElement, Divider } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import ContestSkeleton from '~/components/Skeletons/ContestSkeleton';
import EmptyListIcon from '~/components/CustomIcons/EmptyListIcon';
import ContestService from '~/services/ContestService';
import { ensureMinLoadingDuration } from '~/utils/constants';
import * as ProblemService from '~/services/ProblemService';

const MIN_LOADING_DURATION = 1000;

const AddProblemsForContestForm = ({ curUserId }) => {

  const [searchText, setSearchText] = useState('');
  const [isProblemsToAddLoading, setIsProblemsToAddLoading] = useState(false);
  const [problemsToAdd, setProblemsToAdd] = useState([]);
  const [addedProblems, setAddedProblems] = useState([]);

  useEffect(() => {
    fetchProblemsToAdd();
  }, [curUserId]);

  const fetchProblemsToAdd = async () => {
    setIsProblemsToAddLoading(true);
    const startTime = Date.now();
    try {
      const problemsToAdd = await ProblemService.getProblemsByOwner(curUserId);
      setProblemsToAdd(problemsToAdd);

      await ensureMinLoadingDuration(startTime, MIN_LOADING_DURATION);
    } catch (error) {
      console.error('Error fetching my contests:', error);
      setProblemsToAdd([]);
    } finally {
      setIsProblemsToAddLoading(false);
    }
  }

  const searchProblems = () => {
    console.log('searching...');
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
  };

  return (
    <Box>
      <Flex align="center" gap={6} mt={2}>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search our problems..."
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

      <Box mt={10}>
        {isProblemsToAddLoading ? (
          <ContestSkeleton count={5} />
        ) : (
          problemsToAdd.map((problem) => (
            <Flex
              key={problem.id}
              align="center"
              justifyContent="space-between"
              mb={4}
              cursor="pointer"
              onClick={() => onAddProblemClick(problem.id)}
            >
            </Flex>
          ))
        )}
        {(!isProblemsToAddLoading && (problemsToAdd === null || problemsToAdd.length === 0)) && (
          <EmptyListIcon my={20} iconSize={80} />
        )}
      </Box>

      <Divider my={10} />

      <Box mt={10}>
        {(addedProblems === null || addedProblems.length === 0) ? (
          <EmptyListIcon my={20} iconSize={80} />
        ) : (
          addedProblems.map((problem) => (
            <Flex
              key={problem.id}
              align="center"
              justifyContent="space-between"
              mb={4}
              cursor="pointer"
              onClick={() => onAddProblemClick(problem.id)}
            >
            </Flex>
          ))
        )}
      </Box>
    </Box>
  );
}

export default AddProblemsForContestForm;