import { Box, Button, ButtonGroup, Card, CardBody, VStack } from '@chakra-ui/react';
import AddContestForm from '~/components/AddContestForm/AddContestForm';
import Footer from '~/components/Footer';
import AddProblemsForContestForm from '~/components/AddProblemsForContestForm/AddProblemsForContestForm';
import InviteUsersForm from '~/components/InviteUsersForm/InviteUsersForm';
import { useEffect, useState } from 'react';
import MainNavbar from '~/components/Navbars/MainNavbar';
import ContestService from '~/services/ContestService';

function AddContest() {
  const [curUserId, setCurUserId] = useState(1);
  const [curContest, setCurContest] = useState({
    id: 1,
    ownerId: curUserId,
    imageUrl: 'https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png',
    title: 'Weekly contest 1',
    desc: 'It is good for practicing',
    startTime: new Date(),
    endTime: new Date(),
    duration: 3660000,
    type: 'PUBLIC',
    status: 'PREPARING',
    isDeleted: false,
  });

  useEffect(() => {
    console.log('curContest: ' + JSON.stringify(curContest));
  }, [curContest]);

  const handleStartNow = () => {
    ContestService.addContest(curContest);
  };

  const handleAddOfflineContest = () => {
    ContestService.addContest(curContest);
  };

  const updateContest = (updatedContest) => {
    setCurContest(updatedContest);
  };

  return (
    <Box bg="var(--primary-bg-color)">
      <MainNavbar />

      <VStack gap={10} my={20}>
        <Card variant="elevated" borderRadius="3xl" boxShadow="xl" p="30px" w="fit-content" h="fit-content">
          <CardBody>
            <AddContestForm contest={curContest} onUpdateContest={updateContest} />
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
