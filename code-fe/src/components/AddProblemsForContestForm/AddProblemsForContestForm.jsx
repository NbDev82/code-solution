import { Box, Flex, Input, InputGroup, InputRightElement, Divider } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import ContestSkeleton from '~/components/Skeletons/ContestSkeleton';
import EmptyListIcon from '~/components/CustomIcons/EmptyListIcon';

const AddProblemsForContestForm = () => {

  const [searchText, setSearchText] = useState('');
  const [isProblemsToAddSearching, setIsProblemsToAddSearching] = useState(false);
  const [problemsToAdd, setProblemsToAdd] = useState([]);
  const [addedProblems, setAddedProblems] = useState([]);

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
        {isProblemsToAddSearching ? (
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
        {(!isProblemsToAddSearching && (problemsToAdd === null || problemsToAdd.length === 0)) && (
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