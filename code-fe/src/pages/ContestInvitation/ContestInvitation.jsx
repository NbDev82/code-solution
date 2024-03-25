import React, { useState } from 'react';

import { Flex, Box, Card, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ButtonGroup } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
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
    imageUrl: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
  });
  const [curContestEnrollment, setCurContestEnrollment] = useState({});

  return (
    <Box height='100vh' bg='#F7F8FA'>
      <Navbar />

      <Flex align='center' justify='center'>
        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow="hidden"
          variant="outline"
          mt="50px"
          p="50px"
          borderRadius="3xl"
          boxShadow="lg"
          minW='800px'
          width='80vw'
        >
          <Image
            objectFit="cover"
            maxW={{ base: '100%', sm: '400px' }}
            src={curContest.imageUrl}
            alt="Caffe Latte"
          />

          <Stack spacing={6} ml={{ base: 0, sm: 8}}>
            <CardBody>
              <Heading size="xl" noOfLines={1}>{curContest.title}</Heading>

              <Text fontSize='2xl' noOfLines={1} py="1" pt='20px'><strong>Description:</strong> {curContest.desc}</Text>
              <Text fontSize='2xl' noOfLines={1} py="1"><strong>Start time:</strong> {curContest.startTime}</Text>
              <Text fontSize='2xl' noOfLines={1} py="1"><strong>End time:</strong> {curContest.endTime}</Text>
              <Text fontSize='2xl' noOfLines={1} py="1"><strong>Duration:</strong> {curContest.duration}</Text>
              <Text fontSize='2xl' noOfLines={1} py="1"><strong>Type:</strong> {curContest.type}</Text>
              <Text fontSize='2xl' noOfLines={1} py="1"><strong>Status:</strong> {curContest.status}</Text>
            </CardBody>

            <CardFooter>
              <ButtonGroup gap='4'>
                <Button leftIcon={<CheckIcon />} variant="solid" colorScheme='teal' size='lg' fontSize='2xl'>
                  Accept
                </Button>

                <Button leftIcon={<CloseIcon />} variant="solid" colorScheme='red' size='lg' fontSize='2xl'>
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
