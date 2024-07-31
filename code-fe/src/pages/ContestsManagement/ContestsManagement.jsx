import { Box, Card, CardBody, Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import React, { useState } from 'react';
import MainNavbar from '~/components/Navbars/MainNavbar';
import GlobalContestList from '~/components/GlobalContestList/GlobalContestList';
import MyContestList from '~/components/MyContestList/MyContestList';
import Footer from '~/components/Footer';
import { getCurrentUserDetail } from '~/auth';

const ContestsManagement = () => {
  const [curUser, setCurUser] = useState(getCurrentUserDetail());

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
                    <GlobalContestList curUserId={curUser.id} />
                  </TabPanel>
                  <TabPanel>
                    <MyContestList curUserId={curUser.id} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Stack>
        </Card>
      </Flex>

      <Footer />
    </Box>
  );
};

export default ContestsManagement;
