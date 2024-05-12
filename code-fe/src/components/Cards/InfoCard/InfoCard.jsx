import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Heading,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  HStack,
  VStack,
  Text,
  StackDivider,
} from '@chakra-ui/react';
import Button from '~/components/Buttons/Button';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import Lottie from 'react-lottie';
import KingDefault from '~/assets/lotties/KingDefault';
import { DEFAULT_LOTTIE_OPTIONS } from '~/utils/Const';
import { Link } from 'react-router-dom';
const InfoCard = (props) => {
  const user = props.user;
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      w={props.w}
      borderRadius="var(--radius-size-small)"
      boxShadow={'var(--box-shadow)'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader></CardHeader>
      <CardBody>
        <HStack>
          <Lottie
            options={{ ...DEFAULT_LOTTIE_OPTIONS, autoplay: false, animationData: KingDefault }}
            width={200}
            isPaused={!isHovered}
          />
          <Stack divider={<StackDivider />} spacing="4" w="60%">
            <Box>
              <Heading style={styleHeading}>Full Name</Heading>
              <Text style={styleText}>{user.fullName}</Text>
            </Box>
            <Box>
              <Heading style={styleHeading}>Phone Number</Heading>
              <Text style={styleText}>{user.phoneNumber}</Text>
            </Box>
            <Box>
              <Heading style={styleHeading}>Date Of Birth</Heading>
              <Text style={styleText}>{user.dateOfBirth}</Text>
            </Box>
            <Box>
              <Heading style={styleHeading}>Email</Heading>
              <Text style={styleText}>{user.email}</Text>
            </Box>
          </Stack>
        </HStack>
      </CardBody>
      <CardFooter justifyContent="end" padding="20px 40px" color="var(--gray)"></CardFooter>
    </Card>
  );
};

InfoCard.propTypes = {
  user: PropTypes.object,
  w: PropTypes.string,
};

InfoCard.defaultProps = {
  user: {
    id: '',
    fullName: '',
    phoneNumber: '',
    dateOfBirth: Date.now,
    email: '',
  },
  w: '100%',
};

export default InfoCard;
