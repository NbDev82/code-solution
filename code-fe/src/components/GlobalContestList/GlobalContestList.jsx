import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react';

const GlobalContestList = () => {
  return (
    <Box>
      Global Contests
      <Flex alignItems="center" justifyContent="space-between" p={4}>
        {/* Image at the beginning */}
        <Box mr={4}>
          <Image src="https://via.placeholder.com/150" alt="Sample Image" />
        </Box>

        {/* Title */}
        <Box flex="1">
          <Text fontSize="xl" fontWeight="bold">
            Title
          </Text>
        </Box>

        {/* Time at the end */}
        <Box ml={4}>
          <Text fontSize="sm">Time</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default GlobalContestList;
