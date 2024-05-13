import React, { useEffect, useState } from 'react';
import { getCurrentUserDetail } from '~/auth';
import { Box, Button, Card, CardBody, Flex, Text, useToast, VStack } from '@chakra-ui/react';
import ContestService from '~/services/ContestService';
import MainNavbar from '~/components/Navbars/MainNavbar/MainNavbar';
import AddContestForm from '~/components/AddContestForm/AddContestForm';
import InviteUsersForm from '~/components/InviteUsersForm/InviteUsersForm';
import Footer from '~/components/Footer';
import { useLocation } from 'react-router-dom';
import ContestSkeleton from '~/components/Skeletons/ContestSkeleton';
import EmptyListIcon from '~/components/CustomIcons/EmptyListIcon';
import { ensureMinLoadingDuration } from '~/utils/constants';

const MIN_LOADING_DURATION = 1000;

export default function UpdateContest() {
  const location = useLocation();
  const [curUser, setCurUser] = useState(getCurrentUserDetail());
  const [curContest, setCurContest] = useState(location.state.curContest);
  const [isContestProblemsLoading, setIsContestProblemsLoading] = useState(false);
  const [contestProblems, setContestProblems] = useState([]);
  const toast = useToast();

  useEffect(() => {
    console.log('curContest: ' + JSON.stringify(curContest));
    fetchContestProblems();
  }, [curContest]);

  const fetchContestProblems = async () => {
    setIsContestProblemsLoading(true);
    const startTime = Date.now();
    try {
      let contestProblems = await ContestService.getProblemsByContest(curContest.id);
      setContestProblems(contestProblems);

      await ensureMinLoadingDuration(startTime, MIN_LOADING_DURATION);
    } catch (error) {
      console.error('Error fetching my contests:', error);
      setContestProblems([]);
    } finally {
      setIsContestProblemsLoading(false);
    }
  };

  const onClickUpdateBtn = () => {
    const toUpdate = {
      id: curContest.id,
      title: curContest.title,
      desc: curContest.desc,
      durationInMillis: curContest.durationInMillis
    }
    ContestService.updateContest(toUpdate)
      .then(result => {
        if (result) {
          toast({
            title: `Update contest successfully`,
            position: 'top-right',
            status: 'success',
            isClosable: true,
          });
        } else {
          toast({
            title: `Update contest unsuccessfully`,
            position: 'top-right',
            status: 'error',
            isClosable: true,
          });
        }
      });
  };

  const updateContest = (updatedContest) => {
    setCurContest(updatedContest);
  };

  return (
    <Box bg='var(--primary-bg-color)'>
      <MainNavbar />

      <VStack gap={10} my={20}>

        <Card variant='elevated' borderRadius='3xl' boxShadow='xl' p='20px' h='fit-content' w='1000px'>
          <CardBody>
            <AddContestForm contest={curContest} onUpdateContest={updateContest} />
          </CardBody>
        </Card>

        <Card variant='elevated' borderRadius='3xl' boxShadow='xl' p='20px' h='fit-content' w='1000px'>
          <CardBody>
            <Button
              height='50px'
              width='80px'
              borderRadius='2xl'
              size='lg'
              colorScheme='teal'
              variant='solid'
              onClick={() => onClickUpdateBtn()}
              alignSelf='flex-end'
            >
              Update
            </Button>
          </CardBody>
        </Card>

        <Card variant='elevated' borderRadius='3xl' boxShadow='xl' p='20px' h='fit-content' w='1000px'>
          <CardBody>
            <Text fontWeight='bold' noOfLines={1}>
              Problems in Contest (Readonly)
            </Text>

            <Box mt={10} height='200px' overflowY='auto'>
              {isContestProblemsLoading ? (
                <ContestSkeleton count={5} />
              ) : (
                contestProblems.map((problem, index) => (
                  <Flex
                    key={problem.id}
                    align='center'
                    justifyContent='start'
                    mb={4}
                  >
                    <Box ml={4} flex='1' textAlign='start'>
                      <Text fontWeight='bold' noOfLines={1} _hover={{ textColor: 'blue.500' }}>
                        {problem.name}
                      </Text>
                    </Box>

                    <Box ml={4} flex='1' textAlign='start'>
                      <Text fontSize='xs' color='gray.600' noOfLines={1}>
                        Level: {problem.difficultyLevel}
                      </Text>
                    </Box>

                    <Box ml={4} flex='1' textAlign='start'>
                      <Text fontSize='xs' color='gray.600' noOfLines={1}>
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

        <Card variant='elevated' borderRadius='3xl' boxShadow='xl' p='20px' h='fit-content' w='1000px'>
          <CardBody>
            <InviteUsersForm
              curUserId={curUser.id}
            />
          </CardBody>
        </Card>
      </VStack>

      <Footer />
    </Box>
  );
};