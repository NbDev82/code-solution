import { Flex, Box, Skeleton } from '@chakra-ui/react';

const ContestSkeleton = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Flex
          key={index}
          align="center"
          justifyContent="space-between"
          mb={6}
          cursor="pointer"
        >
          <Skeleton width="124px" height="60px" borderRadius="xl" startColor="gray.200" endColor="gray.300" />
          <Box ml={4} mr={4} flex="1" textAlign="start">
            <Skeleton height="18px" mb={2} startColor="gray.200" endColor="gray.300" />
            <Skeleton height="12px" mb={2} startColor="gray.200" endColor="gray.300" />
            <Skeleton height="12px" startColor="gray.200" endColor="gray.300" />
          </Box>
          <Skeleton height="32px" width="80px" startColor="gray.200" endColor="gray.300" borderRadius="md" />
        </Flex>
      ))}
    </>
  );
};

export default ContestSkeleton;