import React, { useState } from 'react';

import {
  Flex,
  Box,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import Navbar from '~/components/Navbars/HomeNavbar';

function ContestInvitation() {
  const [curContest, setCurContest] = useState({
    title: 'Weekly contest 1',
    desc: 'For newbie',
    startTime: '03/10/2024 07:30',
    endTime: '03/10/2024 10:30',
    duration: '1 hour',
    type: 'PUBLIC',
    status: 'PREPARING',
    imageUrl:
      'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
  });
  const [curContestEnrollment, setCurContestEnrollment] = useState({});

  return (
    <Box height="100vh" bg="var(--primary-bg-color)">
      <Navbar />

      <Flex align="center" justify="center">
        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow="hidden"
          variant="elevated"
          mt="50px"
          p="50px"
          borderRadius="3xl"
          boxShadow="xl"
          minW="800px"
          width="80vw"
        >
          <Image objectFit="cover" maxW={{ base: '100%', sm: '400px' }} src={curContest.imageUrl} alt="Caffe Latte" />

          <Stack spacing={6} ml={{ base: 0, sm: 8 }}>
            <CardBody>
              <Heading size="xl" noOfLines={1}>
                {curContest.title}
              </Heading>

              <Text fontSize="2xl" py="1" noOfLines={1} mt="20px">
                <strong>Description:</strong> {curContest.desc}
              </Text>
              <Text fontSize="2xl" py="1" noOfLines={1}>
                <strong>Duration:</strong> {curContest.durationInMillis}
              </Text>
            </CardBody>

            <CardFooter>
              <ButtonGroup gap="4">
                <Button leftIcon={<CheckIcon />} colorScheme="teal" size="lg" fontFamily="var(--font-family)">
                  Accept
                </Button>

                <Button leftIcon={<CloseIcon />} colorScheme="red" size="lg" fontFamily="var(--font-family)">
                  Deny
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Stack>
        </Card>
      </Flex>
    </Box>
  );
}

export default ContestInvitation;
