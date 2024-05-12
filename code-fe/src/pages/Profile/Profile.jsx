import React, { useState, useEffect, useCallback } from 'react';
import MainNavbar from '~/components/Navbars/MainNavbar';
import {
  Avatar,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  useTab,
  useMultiStyleConfig,
  Button,
  Box,
  HStack,
  VStack,
  Skeleton,
  Image,
} from '@chakra-ui/react';
import { StarIcon, SmallAddIcon } from '@chakra-ui/icons';
import styles from './Profile.module.scss';
import Moutains from '~/assets/images/Moutains.svg';
import InfoCard from '~/components/Cards/InfoCard';
import AchievementsCard from '~/components/Cards/AchievementsCard';
import Footer from '~/components/Footer';
import { PROBLEM_INIT, ACTION, DIALOG_DEFAULT_PROPS } from '~/utils/Const';
import { getCurrentUserDetail } from '~/auth';
import MyTableProblems from '~/components/Problems/MyTableProblems';
import { getAllProblemByUserId, deleteProblem } from '~/services/ProblemService';
import queryString from 'query-string';
import Pagination from '~/components/Pagination';
import { useNavigate, useLocation } from 'react-router-dom';
import Dialog from '~/components/Dialog';
const CustomTab = React.forwardRef((props, ref) => {
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps['aria-selected'];
  const styles = useMultiStyleConfig('Tabs', tabProps);

  return (
    <Button
      leftIcon={isSelected ? <StarIcon fontSize={10} color={'var(--primary-color)'}></StarIcon> : ''}
      __css={styles.tab}
      {...tabProps}
      className={styles.tab__item}
      fontWeight="700"
      fontSize="16px"
      color="var(--secondary-color)"
      _selected={{ color: 'var(--primary-color)', bg: 'var(--secondary-color)' }}
    >
      {tabProps.children}
    </Button>
  );
});

function Profile(props) {
  const [user, setUser] = useState(getCurrentUserDetail());
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState(0);
  const [dialogProps, setDialogProps] = useState({ ...DIALOG_DEFAULT_PROPS });

  const fetchProblemsList = async () => {
    try {
      const response = await getAllProblemByUserId(queryString.stringify({ userId: user.id }));
      console.log(response.data);
      setProblems(response.data);
    } catch (error) {
      console.log('Fetch Problems Error', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setTab(location.state?.tab);
    setLoading(true);
    fetchProblemsList();
    setLoading(false);
  }, []);

  const [achievements, setAchievements] = useState({
    cumulativeScore: user.cumulativeScore ? user.cumulativeScore : 0,
    numberOfSolvedProblems: user?.numberOfSolvedProblems,
    numberOfCompletedCompetitions: user?.numberOfCompletedCompetitions,
  });

  const handleCreateNewProblem = () => {
    const problem = { ...PROBLEM_INIT, ownerId: user.id };
    navigate(`/problem-details/add`, {
      state: { problem, action: ACTION.CREATE },
    });
  };

  const handleDeleteProblem = async (problem) => {
    try {
      const request = queryString.stringify({ problemId: problem.id });
      console.log(request);
      const response = await deleteProblem(request);
      let msg = '';
      response.data ? (msg = `${ACTION.DELETE} successful!`) : (msg = `${ACTION.DELETE} failed!`);
      setDialogProps((prev) => ({
        ...prev,
        msg: msg,
        isOpen: true,
        onYesClick: () => {
          fetchProblemsList();
        },
      }));
    } catch (error) {
      setDialogProps((prev) => ({
        ...prev,
        msg: 'Error delete problem:' + error,
        isOpen: true,
        onYesClick: () => {},
      }));
    }
  };

  const handleTabChange = (index) => {
    setTab(index);
  };

  return (
    <div className="profile">
      <MainNavbar></MainNavbar>
      <Tabs
        className={styles.tabs}
        orientation="vertical"
        isFitted
        variant="enclosed"
        index={tab}
        onChange={handleTabChange}
      >
        <TabList className={styles.tabs__list}>
          <CustomTab>Profile</CustomTab>
          <CustomTab>Problems</CustomTab>
          {/* <CustomTab>Edit</CustomTab> */}
        </TabList>
        <TabPanels padding={0}>
          <TabPanel className={styles.tabs__panel}>
            <VStack h="100%" gap="100px">
              <Box className={styles.box__avatar}>
                <Image width={'100%'} objectFit="cover" src={Moutains} alt="Moutains" />
                <Avatar
                  cursor="pointer"
                  size="2xl"
                  name={user.fullName}
                  className={styles.avatar}
                  src={user.urlImage}
                />
              </Box>
              <HStack gap="20px" w="100%" h="auto" alignItems="start" justifyContent="center">
                <VStack w="45%" gap="20px" alignItems="center" justifyContent="center" marginBottom="100px">
                  <InfoCard user={user}></InfoCard>
                  <AchievementsCard achievements={achievements}></AchievementsCard>
                </VStack>
                <VStack w="45%" gap="20px" alignItems="center" justifyContent="center" marginBottom="100px"></VStack>
              </HStack>
            </VStack>
          </TabPanel>
          <TabPanel className={styles.tabs__panel}>
            <VStack h="100%" gap="100px" className={styles.problem__container}>
              <HStack className={styles.problem__toolbar}>
                <Button
                  color="var(--white)"
                  bg="var(--primary-color)"
                  _hover={{ transform: 'scale(1.05)' }}
                  borderRadius="var(--radius-size-small)"
                  h="40px"
                  fontSize="16px"
                  fontWeight="bold"
                  rightIcon={<SmallAddIcon></SmallAddIcon>}
                  onClick={handleCreateNewProblem}
                >
                  {' '}
                  Create New Problem{' '}
                </Button>
              </HStack>
              <Skeleton height="100%" width={'100%'} borderRadius={'10px'} isLoaded={!loading}>
                <MyTableProblems problems={problems} onDeleteProblem={handleDeleteProblem} />
              </Skeleton>
            </VStack>
          </TabPanel>
          {/* <TabPanel className={styles.tabs__panel}>edit</TabPanel> */}
        </TabPanels>
      </Tabs>
      <Footer></Footer>
      <Dialog dialogProps={dialogProps} setDialogProps={setDialogProps}></Dialog>
    </div>
  );
}

export default Profile;
