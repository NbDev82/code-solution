import { Box, Flex, FormLabel, IconButton, Image, Input, Select, Stack, Textarea } from '@chakra-ui/react';
import { CONTEST_TYPE_OPTIONS } from '~/utils/constants';
import { SystemUpdateAlt } from '@mui/icons-material';

const AddContestForm = ({ contest, onUpdateContest }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const updatedContest = { ...contest, imageUrl: URL.createObjectURL(file) };
    onUpdateContest(updatedContest);
  };

  const handleContestTypeChange = (e) => {
    const newType = e.target.value;
    const updatedContest = { ...contest, type: newType };
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
    <Flex alignContent="center" justifyContent="center" gap={10}>
      <Box alignContent="center" justifyContent="center">
        <Stack>
          <Image src={contest.imageUrl} alt={contest.title} width="300px" height="200" borderRadius="2xl" />
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
  );
};

export default AddContestForm;
