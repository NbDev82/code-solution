import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import Button from '../Buttons/Button';
import styles from './Dialog.module.scss';
const Dialog = (props) => {
  const onClose = () => {
    props.setDialogProps((prev) => ({ ...prev, isOpen: false }));
  };
  const cancelRef = React.useRef();
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={props.dialogProps.isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent className={styles.content}>
        <AlertDialogHeader
          className={{
            [styles.warning]: props.dialogProps.warning,
            [styles.error]: props.dialogProps.error,
            [styles.successful]: props.dialogProps.successful,
          }}
        >
          {props.dialogProps.header}
        </AlertDialogHeader>
        <AlertDialogCloseButton className={styles.close__btn} />
        <AlertDialogBody className={styles.content__body}>{props.dialogProps.msg}</AlertDialogBody>
        <AlertDialogFooter className={styles.content__footer} justifyContent={'space-around'}>
          <Button small className={styles.btn} ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button
            small
            highlight
            onClick={() => {
              props.dialogProps.onYesClick();
              onClose();
            }}
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

Dialog.propTypes = {
  // msg: PropTypes.string,
  //onYesClick: PropTypes.func,
  // isOpen: PropTypes.bool,
  // setIsOpen: PropTypes.func,
  // header: PropTypes.string,
  // warning: PropTypes.bool,
  // error: PropTypes.bool,
  // successful: PropTypes.bool,
  dialogProps: PropTypes.object,
  setDialogProps: PropTypes.func,
};

Dialog.defaultProps = {
  // msg: '',
  // isOpen: false,
  // onYesClick: console.log('yes'),
  // header: 'Notification',
};

export default Dialog;
