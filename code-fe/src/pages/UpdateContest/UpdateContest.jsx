import React, { useEffect, useState } from 'react';
import { getCurrentUserDetail } from '~/auth';
import { Box, Button, Card, CardBody, Flex, IconButton, Text, VStack } from '@chakra-ui/react';
import ContestService from '~/services/ContestService';
import MainNavbar from '~/components/Navbars/MainNavbar/MainNavbar';
import AddContestForm from '~/components/AddContestForm/AddContestForm';
import AddProblemsForContestForm from '~/components/AddProblemsForContestForm/AddProblemsForContestForm';
import InviteUsersForm from '~/components/InviteUsersForm/InviteUsersForm';
import Footer from '~/components/Footer';
import { useLocation } from 'react-router-dom';
import ContestSkeleton from '~/components/Skeletons/ContestSkeleton';
import { AddIcon } from '@chakra-ui/icons';
import EmptyListIcon from '~/components/CustomIcons/EmptyListIcon';

const UpdateContest = () => {
  const location = useLocation();
  const [curUser, setCurUser] = useState(getCurrentUserDetail());
  const [curContest, setCurContest] = useState(location.state);
  const [isContestProblemsLoading, setIsContestProblemsLoading] = useState(false);
  const [contestProblems, setContestProblems] = useState([]);

  useEffect(() => {
    console.log('curContest: ' + JSON.stringify(curContest));
  }, [curContest]);

  const onClickUpdateBtn = () => {
    ContestService.addContest(curContest);
  };

  const updateContest = (updatedContest) => {
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

        <Card variant="elevated" borderRadius="3xl" boxShadow="xl" p="20px" h="fit-content" w="1000px">
          <CardBody>
            <AddContestForm contest={curContest} onUpdateContest={updateContest} />
          </CardBody>
        </Card>

        <Card variant="elevated" borderRadius="3xl" boxShadow="xl" p="20px" h="fit-content" w="1000px">
          <CardBody>
            <Text fontWeight="bold" noOfLines={1}>
              Problems in Contest
            </Text>

            <Box mt={10} height="200px" overflowY="auto">
              {isContestProblemsLoading ? (
                <ContestSkeleton count={5} />
              ) : (
                contestProblems.map((problem, index) => (
                  <Flex
                    key={problem.id}
                    align="center"
                    justifyContent="start"
                    mb={4}
                  >
                    <Box ml={4} flex="1" textAlign="start">
                      <Text fontWeight="bold" noOfLines={1} _hover={{ textColor: 'blue.500' }}>
                        {problem.name}
                      </Text>
                    </Box>

                    <Box ml={4} flex="1" textAlign="start">
                      <Text fontSize="xs" color="gray.600" noOfLines={1}>
                        Level: {problem.difficultyLevel}
                      </Text>
                    </Box>

                    <Box ml={4} flex="1" textAlign="start">
                      <Text fontSize="xs" color="gray.600" noOfLines={1}>
                        Point: {problem.point}
                      </Text>
                    </Box>
                  </Flex>
                ))
              )}
              {(!isContestProblemsLoading && (contestProblems === null || contestProblems.length === 0)) && (
                <EmptyListIcon my={20} iconSize={80} />
              )}
            </Box>
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
              onClick={() => onClickUpdateBtn()}
              alignSelf="flex-end"
            >
              Update
            </Button>
          </CardBody>
        </Card>
      </VStack>

      <Footer />
    </Box>
  );
};

export default UpdateContest;