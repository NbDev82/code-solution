import React from 'react';
import {
  Box,
  VStack,
  Text,
  Image,
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
import LabelIcon from '@mui/icons-material/Label';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Todo from '~/assets/images/Todo.svg';
import Solved from '~/assets/images/Solved.svg';
import Attempted from '~/assets/images/Attempted.svg';
DrawerRightDefault.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  problems: PropTypes.array,
};
DrawerRightDefault.defaultProps = {};

function DrawerRightDefault(props) {
  const navigate = useNavigate();
  const getStatus = (status) => {
    if (status === 'TODO') return Todo;
    else if (status === 'SOLVED') return Solved;
    else return Attempted;
  };
  return (
    <Drawer isOpen={props.isOpen} placement="left" onClose={props.onClose} size={'sm'}>
      <DrawerOverlay />
      <DrawerContent backgroundColor={'var(--white)'}>
        <DrawerHeader borderBottomWidth="1px">
          <Box display="flex" alignItems="center" gap="4%" justifyContent="start">
            <FormatListBulletedIcon></FormatListBulletedIcon>
            <Text className={styles.drawer__heading}>ProblemList</Text>
          </Box>
        </DrawerHeader>

        <DrawerBody padding={0}>
          <VStack>
            {props.problems ? (
              props.problems.map((problem) => (
                <div
                  onClick={() => {
                    navigate(`/problems/${problem?.title.toLowerCase().replace(' ', '-')}`, {
                      state: { problemId: problem?.id, problems: props.problems },
                    });
                    window.location.reload();
                  }}
                  className={styles.drawer__item}
                  style={{ textDecoration: 'none', border: 'none' }}
                >
                  <img src={getStatus(problem.status)} alt={problem.status}></img>
                  <p>{problem?.title}</p>
                </div>
              ))
            ) : (
              <span>None</span>
            )}
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
