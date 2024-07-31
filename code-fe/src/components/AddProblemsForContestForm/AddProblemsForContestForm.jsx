import { Box, Flex, Input, InputGroup, InputRightElement, Divider, Image, Text, IconButton } from '@chakra-ui/react';
import { AddIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import ContestSkeleton from '~/components/Skeletons/ContestSkeleton';
import EmptyListIcon from '~/components/CustomIcons/EmptyListIcon';
import { ensureMinLoadingDuration } from '~/utils/constants';
import * as ProblemService from '~/services/ProblemService';

const MIN_LOADING_DURATION = 1000;

const AddProblemsForContestForm = ({ curUserId, updateProblemIds }) => {

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
      let problemsToAdd = await ProblemService.getProblemsByOwner(curUserId);
      problemsToAdd = filterFetchedProblems(problemsToAdd);
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
    fetchProblemsToAddWithName(searchText);
  };

  const fetchProblemsToAddWithName = async (name) => {
    setIsProblemsToAddLoading(true);
    const startTime = Date.now();
    try {
      let problemsToAdd = await ProblemService.getProblemsByOwnerAndName(curUserId, name);
      problemsToAdd = filterFetchedProblems(problemsToAdd);
      setProblemsToAdd(problemsToAdd);

      await ensureMinLoadingDuration(startTime, MIN_LOADING_DURATION);
    } catch (error) {
      console.error('Error fetching my contests:', error);
      setProblemsToAdd([]);
    } finally {
      setIsProblemsToAddLoading(false);
    }
  };

  const filterFetchedProblems = (newProblems) => {
     const isAddedProblem = (problem) =>
       addedProblems.some(addedProblem => addedProblem.id === problem.id);

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
    const problemToAdd = problemsToAdd.find(problem => problem.id === problemId);

    if (problemToAdd) {
      setAddedProblems(prevAddedProblems => [...prevAddedProblems, problemToAdd]);

      setProblemsToAdd(prevProblemsToAdd =>
        prevProblemsToAdd.filter(problem => problem.id !== problemId)
      );
    }

    updateProblemIdsWithProblems(addedProblems);
  };

  const onRemoveProblemClick = (problemId) => {
    console.log('On onRemoveProblemClick() method');
    setAddedProblems(prevAddedProblems =>
      prevAddedProblems.filter(problem => problem.id !== problemId)
    );

    const problemToAdd = addedProblems.find(problem => problem.id === problemId);
    if (problemToAdd) {
      setProblemsToAdd(prevProblemsToAdd => [...prevProblemsToAdd, problemToAdd]);
    }

    updateProblemIdsWithProblems(addedProblems);
  };

  const updateProblemIdsWithProblems = (problems) => {
    const problemIds = problems.map(p => p.id);
    updateProblemIds(problemIds);
  }

  return (
    <Box>
      <Box flex="1" textAlign="start">
        <Text fontWeight="bold" noOfLines={1}>
          Add Problems to Contest
        </Text>
        <Text fontSize="xs" color="red.600" noOfLines={1}>
          Note: Your contest problems cannot be edited after clicking the Add button
        </Text>
      </Box>

      <Flex align="center" gap={6} mt={4}>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search your problems..."
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
        {isProblemsToAddLoading ? (
          <ContestSkeleton count={5} />
        ) : (
          problemsToAdd.map((problem, index) => (
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
        {(!isProblemsToAddLoading && (problemsToAdd === null || problemsToAdd.length === 0)) && (
          <EmptyListIcon my={20} iconSize={80} />
        )}
      </Box>

      <Divider my={10} />

      <Box mt={10} height="200px" overflowY="auto">
        {(addedProblems === null || addedProblems.length === 0) ? (
          <EmptyListIcon my={20} iconSize={80} />
        ) : (
          addedProblems.map((problem) => (
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


export default AddProblemsForContestForm;