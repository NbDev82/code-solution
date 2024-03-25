import { Box, Button, ButtonGroup, Card, CardBody, VStack } from '@chakra-ui/react';
import AddContestForm from '~/components/AddContestForm/AddContestForm';
import Footer from '~/components/Footer';
import AddProblemsForContestForm from '~/components/AddProblemsForContestForm/AddProblemsForContestForm';
import InviteUsersForm from '~/components/InviteUsersForm/InviteUsersForm';
import { useState } from 'react';
import MainNavbar from '~/components/Navbars/MainNavbar';

function AddContest() {
  const [curContest, setCurContest] = useState({
    id: 1,
    ownerId: 2,
    imageUrl: 'https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png',
    title: 'Weekly contest 1',
    desc: 'It is good for practicing',
    startTime: new Date('2024-03-01T07:30:00'),
    endTime: new Date('2024-03-01T10:30:00'),
    duration: 3661000,
    type: 'PUBLIC',
    status: 'PREPARING',
    isDeleted: false,
  });

  const handleStartNow = () => {};

  const handleAddOfflineContest = () => {};

  return (
    <Box bg="var(--primary-bg-color)">
      <MainNavbar />

      <VStack gap={10} my={20}>
        <Card variant="elevated" borderRadius="3xl" boxShadow="xl" p="30px" w="fit-content" h="fit-content">
          <CardBody>
            <AddContestForm contest={curContest} />
          </CardBody>
        </Card>

        <Card variant="elevated" borderRadius="3xl" boxShadow="xl" p="20px" w="fit-content" h="fit-content">
          <CardBody>
            <AddProblemsForContestForm />
          </CardBody>
        </Card>

        <Card variant="elevated" borderRadius="3xl" boxShadow="xl" p="20px" w="fit-content" h="fit-content">
          <CardBody>
            <InviteUsersForm />
          </CardBody>
        </Card>

        <Card variant="elevated" borderRadius="3xl" boxShadow="xl" p="20px" w="80%" h="fit-content">
          <CardBody>
            <ButtonGroup gap={6} justifyContent="flex-end">
              <Button
                height="50px"
                borderRadius="2xl"
                size="lg"
                colorScheme="teal"
                variant="solid"
                onClick={() => handleStartNow()}
              >
                Start now
              </Button>

              <Button
                height="50px"
                borderRadius="2xl"
                size="lg"
                colorScheme="teal"
                variant="solid"
                onClick={() => handleAddOfflineContest()}
              >
                Add offline contest
              </Button>
            </ButtonGroup>
          </CardBody>
        </Card>
      </VStack>

      <Footer />
    </Box>
  );
}

export default AddContest;
