import { Box, Flex, FormLabel, IconButton, Image, Input, Select, Stack, Text, Textarea } from '@chakra-ui/react';
import { CONTEST_TYPE_OPTIONS } from '~/utils/constants';
import { SystemUpdateAlt } from '@mui/icons-material';
import React from 'react';

const AddContestForm = ({ contest, onUpdateContest }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const updatedContest = { ...contest, imageUrl: URL.createObjectURL(file) };
    onUpdateContest(updatedContest);
  };

  const handleInputTextChange = (e) => {
    const { name, value } = e.target;
    const updatedContest = { ...contest, [name]: value };
    onUpdateContest(updatedContest);
  };

  const handleDateTimeChange = (e) => {
    const { name, value } = e.target;
    console.log('value of input date: ' + value);
    let date = new Date(value);
    onUpdateContest({ ...contest, [name]: date });
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
            <Image src={contest.imageUrl} alt={contest.title} width="400px" height="200" borderRadius="2xl" />
            <Input type="file" accept="image/*" display="none" onChange={handleImageChange} id="image-picker" />
            <label htmlFor="image-picker">
              <IconButton as="span" aria-label="Upload Image" icon={<SystemUpdateAlt />} />
            </label>
          </Stack>
        </Box>

        <Box>
          <FormLabel>Title:</FormLabel>
          <Input name="title" placeholder="Type..." value={contest.title} onChange={handleInputTextChange} />

          <FormLabel mt={6}>Description:</FormLabel>
          <Textarea name="desc" placeholder="Type..." value={contest.desc} onChange={handleInputTextChange} />

          <Flex align="center" mt={6}>
            <FormLabel>Duration: </FormLabel>
            <Input
              name="duration"
              placeholder="Select Time"
              size="md"
              type="time"
              mr={4}
              value={new Date(contest.duration).toISOString().substr(11, 8)}
              onChange={handleDateTimeChange}
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default AddContestForm;
