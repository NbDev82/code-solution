import React, { useState } from 'react';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Avatar } from '@chakra-ui/react';
import AvatarSample from '~/assets/images/AvatarSample.png';
import Moutains from '~/assets/images/Moutains.svg';
import TextVideo from '~/assets/video/Text-Video.gif';
import { Box } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import './DrawerRightDefault.scss';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import InsightsIcon from '@mui/icons-material/Insights';
DrawerRightDefault.propTypes = {
  isOpen: PropTypes.func,
  onClose: PropTypes.func,
};

function DrawerRightDefault(props) {
  const [username, setUsername] = useState('Nguyễn Trường An');

  return (
    <Drawer isOpen={props.isOpen} placement="right" onClose={props.onClose} finalFocusRef={props.btnRef} size={'sm'}>
      <DrawerOverlay />
      <DrawerContent backgroundColor={'var(--white)'}>
        <DrawerHeader borderBottomWidth="1px">
          <Box display="flex" alignItems="center" gap="4%" justifyContent="start">
            <Avatar size="xl" name="My" src={AvatarSample} />
            <Heading as="h2" size="lg" className="drawer__heading">
              {username}
            </Heading>
          </Box>
        </DrawerHeader>

        <DrawerBody padding={0}>
          <VStack>
            <Link to={{ pathname: '/home' }} className="drawer__item">
              <HomeIcon sx={{ fontSize: 24 }}></HomeIcon>
              <p>Home</p>
            </Link>
            <Link to={{ pathname: '/profile' }} className="drawer__item">
              <PersonIcon sx={{ fontSize: 24 }}></PersonIcon>
              <p>Profile</p>
            </Link>
            <Link to={{ pathname: '/problems' }} className="drawer__item">
              <InsightsIcon sx={{ fontSize: 24 }}></InsightsIcon>
              <p>Statistic</p>
            </Link>
            <Link to={{ pathname: '/sign-in' }} className="drawer__item">
              <LogoutIcon sx={{ fontSize: 24 }}></LogoutIcon>
              <p>Logout</p>
            </Link>
          </VStack>
        </DrawerBody>

        <DrawerFooter padding={0}>
          <VStack>
            <Image width={'100%'} objectFit="cover" src={TextVideo} alt="TextVideo" />
            <Image width={'100%'} objectFit="cover" src={Moutains} alt="Moutains" />
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerRightDefault;
