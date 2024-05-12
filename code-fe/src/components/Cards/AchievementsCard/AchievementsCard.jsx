import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Heading,
  StackDivider,
  Text,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  HStack,
} from '@chakra-ui/react';
import Lottie from 'react-lottie';
import { DEFAULT_LOTTIE_OPTIONS } from '~/utils/Const';
import CupAmination from '~/assets/lotties/Cup';
const Achievements = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const achievements = props.achievements;
  const styleText = {
    fontSize: '16px',
    fontFamily: 'var(--font-family)',
    color: 'var(--gray-300)',
  };
  const styleHeading = {
    fontSize: '16px',
    fontFamily: 'var(--font-family)',
    color: 'var(--secondary-color)',
  };
  return (
    <Card
      w={props.w}
      direction={{ base: 'column', sm: 'row' }}
      borderRadius="var(--radius-size-small)"
      className="card"
      boxShadow={'var(--box-shadow)'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Stack>
        <CardHeader></CardHeader>
        <CardBody>
          <HStack>
            <Lottie
              options={{ ...DEFAULT_LOTTIE_OPTIONS, autoplay: false, animationData: CupAmination }}
              width={200}
              isPaused={!isHovered}
            />
            <Stack divider={<StackDivider />} spacing="4" w="60%">
              <Box>
                <Heading style={styleHeading}>Cummulative Score</Heading>
                <Text style={styleText}>{achievements?.cumulativeScore}</Text>
              </Box>
              <Box>
                <Heading style={styleHeading}>Number Of Solved Problems</Heading>
                <Text style={styleText}>{achievements?.numberOfSolvedProblems}</Text>
              </Box>
              <Box>
                <Heading style={styleHeading}>Number Of Completed Competitions</Heading>
                <Text style={styleText}>{achievements?.numberOfCompletedCompetitions}</Text>
              </Box>
            </Stack>
          </HStack>
        </CardBody>
        <CardFooter></CardFooter>
      </Stack>
    </Card>
  );
};

Achievements.propTypes = { achievements: PropTypes.object, w: PropTypes.string };
Achievements.defaultProps = {
  achievements: { cummulativeScore: 0, numberOfSolvedProblems: 0, numberOfCompletedCompetitions: 0 },
  w: '100%',
};
export default Achievements;
