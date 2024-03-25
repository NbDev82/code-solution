import { Box, Flex, FormLabel, Image, Input, Select, Textarea } from '@chakra-ui/react';
import { CONTEST_TYPE_OPTIONS } from '~/utils/constants';

const AddContestForm = ({ contest }) => {
  const handleContestTypeChange = (e) => {
    const newType = e.target.value;
  };

  return (
    <Flex alignContent="center" justifyContent="center" gap={10}>
      <Box alignContent="center" justifyContent="center">
        <Image src={contest.imageUrl} alt={contest.title} width="300px" height="200" borderRadius="2xl" />
      </Box>
      <Box>
        <FormLabel>Title:</FormLabel>
        <Input placeholder="Type..." defaultValue={contest.title} />

        <FormLabel mt={6}>Description:</FormLabel>
        <Textarea placeholder="Type..." defaultValue={contest.desc} />

        <Flex align="center" mt={6}>
          <FormLabel>Start: </FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            mr={4}
            defaultValue={contest.startTime.toISOString().slice(0, -8)}
          />
          <FormLabel>End: </FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            defaultValue={contest.endTime.toISOString().slice(0, -8)}
          />
        </Flex>

        <Flex align="center" mt={6}>
          <FormLabel>Duration: </FormLabel>
          <Input
            placeholder="Select Time"
            size="md"
            type="time"
            mr={4}
            defaultValue={new Date(contest.duration).toISOString().substr(11, 8)}
          />

          <FormLabel>Status: </FormLabel>
          <Select value={contest.type} onChange={handleContestTypeChange}>
            {CONTEST_TYPE_OPTIONS.map((options) => (
              <option key={options.value} value={options.value}>
                {options.label}
              </option>
            ))}
          </Select>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AddContestForm;
