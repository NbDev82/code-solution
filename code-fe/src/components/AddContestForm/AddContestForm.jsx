import { Box, Flex, FormLabel, IconButton, Image, Input, Select, Stack, Text, Textarea } from '@chakra-ui/react';
import { CONTEST_TYPE_OPTIONS } from '~/utils/constants';
import { SystemUpdateAlt } from '@mui/icons-material';
import React from 'react';

const AddContestForm = ({ contest, onUpdateContest }) => {
  const handleInputTextChange = (e) => {
    const { name, value } = e.target;
    const updatedContest = { ...contest, [name]: value };
    onUpdateContest(updatedContest);
  };

  const handleDateTimeChange = (event) => {
    const { name, value } = event.target;
    const [hours, minutes] = value.split(':').map(Number);

    const durationInMillis = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);

    onUpdateContest(prevContest => ({
      ...prevContest,
      [name]: durationInMillis,
    }));
  };

  return (
    <Box>
      <Box flex="1" textAlign="start">
        <Text fontWeight="bold" noOfLines={1}>
          Basic information
        </Text>
      </Box>

      <Flex alignContent="center" justifyContent="center" gap={10} mt={10}>
        <Box alignContent="center" justifyContent="center">
          <Stack>
            <Image src={"https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png"} alt={contest?.title} width="400px" height="200" borderRadius="2xl" />
          </Stack>
        </Box>

        <Box>
          <FormLabel>Title:</FormLabel>
          <Input name="title" placeholder="Type..." value={contest?.title} onChange={handleInputTextChange} />

          <FormLabel mt={6}>Description:</FormLabel>
          <Textarea name="desc" placeholder="Type..." value={contest?.desc} onChange={handleInputTextChange} />

          <Flex align="center" mt={6}>
            <FormLabel>Duration: </FormLabel>
            <Input
              name="duration"
              placeholder="Select Time"
              size="md"
              type="time"
              mr={4}
              value={new Date(contest.durationInMillis).toISOString().substr(11, 8)}
              onChange={handleDateTimeChange}
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default AddContestForm;
