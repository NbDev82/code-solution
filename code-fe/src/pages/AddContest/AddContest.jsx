import { Box, Button, Card, CardBody, Text, useToast, VStack } from '@chakra-ui/react';
import AddContestForm from '~/components/AddContestForm/AddContestForm';
import Footer from '~/components/Footer';
import AddProblemsForContestForm from '~/components/AddProblemsForContestForm/AddProblemsForContestForm';
import React, { useEffect, useState } from 'react';
import MainNavbar from '~/components/Navbars/MainNavbar';
import ContestService from '~/services/ContestService';
import { getCurrentUserDetail } from '~/auth';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

function AddContest() {
  const navigate = useNavigate();
  const [curUser, setCurUser] = useState(getCurrentUserDetail());
  const [curContest, setCurContest] = useState({
    id: 1,
    ownerId: curUser.id,
    imgUrl: 'https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png',
    title: 'Weekly contest 1',
    desc: 'It is good for practicing',
    duration: 3660000,
    isDeleted: false,
    problemIds: [],
    participantIds: []
  });
  const toast = useToast();

  useEffect(() => {
    console.log('curContest: ' + JSON.stringify(curContest));
  }, [curContest]);

  const onClickAddBtn = () => {
    ContestService.addContest(curContest)
      .then(result => {
        console.log(`onAddBtnClick() - is Contest Added: ${result}`);

        if (result) {
          toast({
            title: `Add contest successfully`,
            position: 'top-right',
            status: 'success',
            isClosable: true,
          })

          navigate(config.routes.update_contest, {
            state: curContest
          });
        } else {
          toast({
            title: `Add contest unsuccessfully`,
            position: 'top-right',
            status: 'error',
            isClosable: true,
          })
        }
      })
      .catch(error => {
        console.error(error);
      });;
  };

  const updateContest = (updatedContest) => {
    setCurContest(updatedContest);
  };

  const updateProblemIds = (problemIds) => {
    const updatedContest = { ...curContest };
    updatedContest.problemIds = problemIds;
    setCurContest(updatedContest);
  };

  return (
    <Box bg="var(--primary-bg-color)">
      <MainNavbar />

      <VStack gap={10} my={20}>

        <Card variant="elevated" borderRadius="3xl" boxShadow="xl" p="20px" h="fit-content" w="1000px">
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
            <Button
              height="50px"
              width="80px"
              borderRadius="2xl"
              size="lg"
              colorScheme="teal"
              variant="solid"
              onClick={() => onClickAddBtn()}
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
}

export default AddContest;
