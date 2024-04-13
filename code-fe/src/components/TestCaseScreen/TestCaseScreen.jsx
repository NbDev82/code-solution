import React, { useContext} from 'react';
import './TestCaseScreen.scss';
import { ProblemContext } from '~/pages/SubmitCode/SubmitCodeScreen';
import { Tabs, TabList, TabPanels, TabPanel, Tab, StackDivider, VStack, HStack, Text } from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';

function TestCaseScreen() {
  const { result } = useContext(ProblemContext);
  const renderTabColor = () => {
    let value = 'var(--orange)';
    if (result !== '') {
      result.status === 'ACCEPTED' ? (value = 'var(--green)') : (value = 'var(--red)');
    }
    return { color: value };
  };
  return (
    <Tabs className="tabs" defaultIndex={0}>
      <TabList className="tabs__list">
        <Tab className="tabs__list--item" fontSize="16px" _selected={() => renderTabColor()}>
          Result
        </Tab>
        <Tab className="tabs__list--item" fontSize="16px" _selected={() => renderTabColor()}>
          Last Testcase
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel className="tabs__panel">
          {result === '' && <h3 className="centered">You must run your code first.</h3>}
          {result !== '' && (
            <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch" w="100%">
              <HStack>
                <Text>Status: </Text>
                {result.status === 'ACCEPTED' ? (
                  <CheckCircleIcon w={8} h={8} color="var(--green)" />
                ) : (
                  <WarningIcon w={8} h={8} color="var(--red)" />
                )}
              </HStack>
              <HStack>
                <Text>Message: </Text>
                <Text noOfLines={1}>{result.message}</Text>
              </HStack>
              <HStack>
                <Text>Testcase: </Text>
                <Text>
                  {result.passedTestcase} / {result.maxTestcase}
                </Text>
              </HStack>
              <HStack>
                <Text>Runtime: </Text>
                <Text>{result.runtime}s</Text>
              </HStack>
              <HStack>
                <Text>Memory Usage: </Text>
                <Text>{result.memory}MB</Text>
              </HStack>
            </VStack>
          )}
        </TabPanel>
        <TabPanel className="tabs__panel">
          {' '}
          {result.status === 'ACCEPTED' && <h3 className="centered">Your problem has passed.</h3>}
          {result === '' && <h3 className="centered">You must run your code first.</h3>}
          {result !== '' && result.status === 'WRONG_ANSWER' && (
            <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch" w="100%">
              <HStack>
                <Text>Input: </Text>
                <Text>{result.lastTestcase.input}</Text>
              </HStack>
              <HStack>
                <Text>Output: </Text>
                <Text>{result.lastTestcase.outputData}</Text>
              </HStack>
              <HStack>
                <Text>Expected: </Text>
                <Text>{result.lastTestcase.expected}</Text>
              </HStack>
            </VStack>
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default TestCaseScreen;
