import { Box, Flex, Spacer, Text, Image, Grid, Stack, HStack, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { demoRankingList } from '~/utils/demoContestData';

const GOLDEN_PLAYERS_COUNT = 3;

const RankingList = () => {
  const [topPlayers, setTopPlayers] = useState(demoRankingList);

  return (
    <Box>
      {topPlayers.map((player, index) => (
        <Flex key={player.userId} align="center" justifyItems="space-between" mb={6}>
          <Text color={index < GOLDEN_PLAYERS_COUNT ? 'gold.500' : 'inherit'} as="i">
            {player.ordinalNumber}
          </Text>

          <Image
            src={player.imageUrl}
            alt={`Avatar of ${player.fullName}`}
            boxSize="4.5rem"
            borderRadius="full"
            ml={6}
          />

          <VStack gap={0} flex="1" align="start" ml={5}>
            <Text color={index < GOLDEN_PLAYERS_COUNT ? 'gold.500' : 'inherit'} as="b">
              {player.fullName}
            </Text>
            <HStack fontSize="xs">
              <Text>
                <strong>Attended: </strong>
                {player.attended}
              </Text>
              <Text ml={2}>
                <strong>Score: </strong>
                {player.score}
              </Text>
            </HStack>
          </VStack>
        </Flex>
      ))}
    </Box>
  );
};

export default RankingList;
