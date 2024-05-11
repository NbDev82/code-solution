import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import React, { useRef, useState } from 'react';
import MainNavbar from '~/components/Navbars/MainNavbar';
import RankingList from '~/components/RankingList/RankingList';
import GlobalContestList from '~/components/GlobalContestList/GlobalContestList';
import MyContestList from '~/components/MyContestList/MyContestList';
import Footer from '~/components/Footer';

const ContestsManagement = () => {

  const [curUserId, setCurUserId] = useState(1);

  return (
    <Box bg="var(--primary-bg-color)">
      <MainNavbar />

      <Flex templateColumns="1fr 1fr" gap={10} p="50px" h="fit-content" align="flex-start" justify="center">
        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow="hidden"
          variant="elevated"
          py="10px"
          borderRadius="3xl"
          boxShadow="xl"
          w="66.67%"
          h="fit-content"
        >
          <Stack spacing={6} ml={{ base: 0, sm: 8 }} flex="1">
            <CardBody>
              <Tabs variant="soft-rounded" colorScheme="green">
                <TabList gap={6}>
                  <Tab>Global Contests</Tab>
                  <Tab>My Contests</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <GlobalContestList curUserId={curUserId} />
                  </TabPanel>
                  <TabPanel>
                    <MyContestList curUserId={curUserId} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Stack>
        </Card>

        <Card overflow="hidden" variant="elevated" p="10px" borderRadius="3xl" boxShadow="xl" w="auto" h="fit-content">
          <CardBody>
            <Heading noOfLines={1} size="md" align="center" justify="center">
              Top 10 global players
            </Heading>

            <Box mt={10} height="100%">
              <RankingList />
            </Box>
          </CardBody>

          <CardFooter align="center" justify="center">
            <Button colorScheme="customBlue" variant="link" fontSize="xs">
              View more
            </Button>
          </CardFooter>
        </Card>
      </Flex>

      <Footer />
    </Box>
  );
};

export default ContestsManagement;
