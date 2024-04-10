import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import './Profile.scss';
import { Image } from '@chakra-ui/react';
import Moutains from '~/assets/images/Moutains.svg';
import InfoCard from '~/components/Cards/InfoCard';
import ProblemCard from '~/components/Cards/ProblemCard';
import AchievementsCard from '~/components/Cards/AchievementsCard';
import Footer from '~/components/Footer';
import { USER_SAMPLE, PROBLEMS_SAMPLE } from '~/utils/Const';

function Profile(props) {
  const CustomTab = React.forwardRef((props, ref) => {
    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps['aria-selected'];
    const styles = useMultiStyleConfig('Tabs', tabProps);

    return (
      <Button
        leftIcon={isSelected ? <StarIcon fontSize={10} color={'var(--primary-color)'}></StarIcon> : ''}
        __css={styles.tab}
        {...tabProps}
        className="tab__item"
        fontWeight="700"
        fontSize="16px"
        color="var(--secondary-color)"
        _selected={{ color: 'var(--primary-color)', bg: 'var(--secondary-color)' }}
      >
        {tabProps.children}
      </Button>
    );
  });

  const [user, setUser] = useState(USER_SAMPLE);
  const [problems, setProblems] = useState(PROBLEMS_SAMPLE);

  const [achievements, setAchievements] = useState({
    cummulativeScore: 1520,
    numberOfSolvedProblems: 11,
    numberOfCompletedCompetitions: 2,
  });

  return (
    <div className="profile">
      <MainNavbar></MainNavbar>
      <Tabs className="tabs" orientation="vertical" isFitted variant="enclosed">
        <TabList className="tabs__list">
          <CustomTab>Profile</CustomTab>
          <CustomTab>Problems</CustomTab>
          <CustomTab>Edit</CustomTab>
        </TabList>
        <TabPanels padding={0}>
          <TabPanel className="tabs__panel">
            <VStack h="100%" gap="100px">
              <Box className="box__avatar">
                <Image width={'100%'} objectFit="cover" src={Moutains} alt="Moutains" />
                <Avatar size="2xl" name={user.fullName} className="avatar" src={user.avatarSrc} />
              </Box>
              <HStack gap="20px" w="100%" h="auto" alignItems="start" justifyContent="center">
                <VStack w="45%" gap="20px" alignItems="center" justifyContent="center" marginBottom="100px">
                  <InfoCard user={user}></InfoCard>
                  <AchievementsCard achievements={achievements}></AchievementsCard>
                </VStack>
                <VStack w="45%" gap="20px" alignItems="center" justifyContent="center" marginBottom="100px">
                  {problems.map((problem) => (
                    <ProblemCard key={problem.id} user={user} problem={problem}></ProblemCard>
                  ))}
                </VStack>
              </HStack>
            </VStack>
          </TabPanel>
          <TabPanel className="tabs__panel">2</TabPanel>
          <TabPanel className="tabs__panel">3</TabPanel>
        </TabPanels>
      </Tabs>
      <Footer></Footer>
    </div>
  );
}

export default Profile;
