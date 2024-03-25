import {
  Badge,
  Box,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { myDemoContests } from '~/utils/demoContestData';
import { ContestSearchOptions, formatDateTime, formatDuration, getStatusColor } from '~/utils/constants';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import SimplePagination from '~/components/Pagination/SimplePagination';

const GlobalContestList = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [globalContests, setGlobalContests] = useState(myDemoContests);

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

  const handleClickContest = (contestId) => {
    console.log('On handleClickContest() method');
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
      </Flex>

      <Box mt={10}>
        {globalContests.map((contest) => (
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
              <Badge variant="subtle" borderRadius="md" color={getStatusColor(contest.status)} px={4} me={10}>
                {contest.status}
              </Badge>
            </Box>
          </Flex>
        ))}
      </Box>

      <Box mt={10}>
        <SimplePagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </Box>
    </Box>
  );
};

export default GlobalContestList;
