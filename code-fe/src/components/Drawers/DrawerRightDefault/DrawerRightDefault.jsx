import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Image,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Moutains from '~/assets/images/Moutains.svg';
import TextVideo from '~/assets/video/Text-Video.gif';
import './DrawerRightDefault.scss';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import InsightsIcon from '@mui/icons-material/Insights';
DrawerRightDefault.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  user: PropTypes.object,
};
DrawerRightDefault.defaultProps = {
  user: {
    id: '',
    fullName: 'User',
    phoneNumber: '',
    dateOfBirth: '',
    email: '',
    avatarSrc: '',
  },
};

function DrawerRightDefault(props) {
  const user = props.user;
  return (
    <Drawer isOpen={props.isOpen} placement="right" onClose={props.onClose} size={'sm'}>
      <DrawerOverlay />
      <DrawerContent backgroundColor={'var(--white)'}>
        <DrawerHeader borderBottomWidth="1px">
          <Box display="flex" alignItems="center" gap="4%" justifyContent="start">
            <Avatar size="xl" name={user.fullName} src={user.urlImage} />
            <Text className="drawer__heading">{user.fullName}</Text>
          </Box>
        </DrawerHeader>

        <DrawerBody padding={0}>
          <VStack>
            <Link
              to={{ pathname: '/home' }}
              className="drawer__item"
              style={{ textDecoration: 'none', border: 'none' }}
            >
              <HomeIcon sx={{ fontSize: 24 }}></HomeIcon>
              <p>Home</p>
            </Link>
            <Link
              to={{ pathname: '/profile', state: { tab: 0 } }}
              className="drawer__item"
              style={{ textDecoration: 'none', border: 'none' }}
            >
              <PersonIcon sx={{ fontSize: 24 }}></PersonIcon>
              <p>Profile</p>
            </Link>
            <Link
              to={{ pathname: '/problems' }}
              className="drawer__item"
              style={{ textDecoration: 'none', border: 'none' }}
            >
              <InsightsIcon sx={{ fontSize: 24 }}></InsightsIcon>
              <p>Statistic</p>
            </Link>
            <Link
              to={{ pathname: '/sign-in' }}
              className="drawer__item"
              style={{ textDecoration: 'none', border: 'none' }}
            >
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
