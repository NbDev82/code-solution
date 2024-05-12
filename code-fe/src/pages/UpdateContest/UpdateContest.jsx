import { useEffect, useState } from 'react';
import { getCurrentUserDetail } from '~/auth';
import { Box, Button, Card, CardBody, VStack } from '@chakra-ui/react';
import ContestService from '~/services/ContestService';
import MainNavbar from '~/components/Navbars/MainNavbar/MainNavbar';
import AddContestForm from '~/components/AddContestForm/AddContestForm';
import AddProblemsForContestForm from '~/components/AddProblemsForContestForm/AddProblemsForContestForm';
import InviteUsersForm from '~/components/InviteUsersForm/InviteUsersForm';
import Footer from '~/components/Footer';

const UpdateContest = () => {
  const [curUser, setCurUser] = useState(getCurrentUserDetail());
  const [curContest, setCurContest] = useState({
    id: 1,
    ownerId: curUser.id,
    imageUrl: 'https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png',
    title: 'Weekly contest 1',
    desc: 'It is good for practicing',
    duration: 3660000,
    isDeleted: false,
    problemIds: [],
    participantIds: []
  });

  useEffect(() => {
    console.log('curContest: ' + JSON.stringify(curContest));
  }, [curContest]);

  const onAddBtnClick = () => {
    ContestService.addContest(curContest);
  };

  const updateContest = (updatedContest) => {
    setCurContest(updatedContest);
  };

  const updateProblemIds = (problemIds) => {
    const updatedContest = { ...curContest };
    updatedContest.problemIds = problemIds;
    setCurContest(updatedContest);
  };

  const updateParticipantIds = (participantIds) => {
    const updatedContest = { ...curContest };
    updatedContest.participantIds = participantIds;
    setCurContest(updatedContest);
  };

  return (
    <Box bg="var(--primary-bg-color)">
      <MainNavbar />

      <VStack gap={10} my={20}>
        <Card variant="elevated" borderRadius="3xl" boxShadow="xl" p="30px" h="fit-content" w="1000px">
          <CardBody>
            <AddContestForm contest={curContest} onUpdateContest={updateContest} />
          </CardBody>
        </Card>

        <Card variant="elevated" borderRadius="3xl" boxShadow="xl" p="20px" h="fit-content" w="1000px">
          <CardBody>
            <AddProblemsForContestForm
              curUserId={curUser.id}
              updateProblemIds={updateProblemIds}
            />
          </CardBody>
        </Card>

        <Card variant="elevated" borderRadius="3xl" boxShadow="xl" p="20px" h="fit-content" w="1000px">
          <CardBody>
            <InviteUsersForm
              curUserId={curUser.id}
              updateParticipantIds={updateParticipantIds}
            />
          </CardBody>
        </Card>

        <Card variant="elevated" borderRadius="3xl" boxShadow="xl" p="20px" h="fit-content" w="1000px">
          <CardBody>
            <Button
              height="50px"
              width="80px"
              borderRadius="2xl"
              size="lg"
              colorScheme="teal"
              variant="solid"
              onClick={() => onAddBtnClick()}
              alignSelf="flex-end"
            >
              Add
            </Button>
          </CardBody>
        </Card>
      </VStack>

      <Footer />
    </Box>
  );
};

export default UpdateContest;