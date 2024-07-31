import { Box, Center, Text } from '@chakra-ui/react';
import EmptyList from '~/assets/images/EmptyList.svg';
import React from 'react';

const EmptyListIcon = ({ my, iconSize = 200 }) => {
  return (
    <Box my={my} textAlign="center">
      <Center>
        <img src={EmptyList} alt="empty list" style={{ marginBottom: '10px', width: iconSize, height: iconSize }} />
      </Center>
      <Text color="gray.400" fontSize="md">
        Oops! No results found
      </Text>
    </Box>
  );
}

export default EmptyListIcon;