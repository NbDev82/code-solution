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
import styles from '../Drawer.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import EditIcon from '@mui/icons-material/Edit';
DrawerRightDefault.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  problems: PropTypes.array,
};
DrawerRightDefault.defaultProps = {};

function DrawerRightDefault(props) {
  return (
    <Drawer isOpen={props.isOpen} placement="left" onClose={props.onClose} size={'sm'}>
      <DrawerOverlay />
      <DrawerContent backgroundColor={'var(--white)'}>
        <DrawerHeader borderBottomWidth="1px">
          <Box display="flex" alignItems="center" gap="4%" justifyContent="start">
            <Text className={styles.drawer__heading}>ProblemList</Text>
          </Box>
        </DrawerHeader>

        <DrawerBody padding={0}>
          <VStack>
            {props.problems.map((problem) => (
              <div
                onClick={() => {}}
                className={styles.drawer__item}
                style={{ textDecoration: 'none', border: 'none' }}
              >
                <HomeIcon sx={{ fontSize: 24 }}></HomeIcon>
                <p>{problem?.title}</p>
              </div>
            ))}
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
