import { Box, Flex, Spacer, Text, Image, Grid, Stack, HStack, VStack } from '@chakra-ui/react';
import { useState } from 'react';

const GOLDEN_PLAYERS_COUNT = 3;

const RankingList = () => {
  const [topPlayers, setTopPlayers] = useState([
    {
      userId: 1,
      ordinalNumber: 1,
      imageUrl: 'https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg',
      fullName: 'Văn An 1',
      attended: '100',
      score: '1000',
    },
    {
      userId: 2,
      ordinalNumber: 2,
      imageUrl: 'https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg',
      fullName: 'Văn An 2',
      attended: '99',
      score: '990',
    },
    {
      userId: 3,
      ordinalNumber: 3,
      imageUrl: 'https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg',
      fullName: 'Văn An 3',
      attended: '80',
      score: '700',
    },
    {
      userId: 4,
      ordinalNumber: 4,
      imageUrl: 'https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg',
      fullName: 'Văn An 3',
      attended: '80',
      score: '680',
    },
    {
      userId: 5,
      ordinalNumber: 5,
      imageUrl: 'https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg',
      fullName: 'Văn An 3',
      attended: '80',
      score: '680',
    },
    {
      userId: 6,
      ordinalNumber: 6,
      imageUrl: 'https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg',
      fullName: 'Văn An 3',
      attended: '80',
      score: '680',
    },
    {
      userId: 7,
      ordinalNumber: 7,
      imageUrl: 'https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg',
      fullName: 'Văn An 3',
      attended: '80',
      score: '680',
    },
    {
      userId: 8,
      ordinalNumber: 8,
      imageUrl: 'https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg',
      fullName: 'Văn An 3',
      attended: '80',
      score: '680',
    },
    {
      userId: 9,
      ordinalNumber: 9,
      imageUrl: 'https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg',
      fullName: 'Văn An 3',
      attended: '80',
      score: '680',
    },
    {
      userId: 10,
      ordinalNumber: 10,
      imageUrl: 'https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg',
      fullName: 'Văn An 3',
      attended: '80',
      score: '680',
    },
  ]);

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
