import React, { useState } from 'react';
import styles from './Instructions.module.scss';
import Lottie from 'react-lottie';
import Robot from '~/assets/lotties/Robot';
import { DEFAULT_LOTTIE_OPTIONS } from '~/utils/Const';
import PropTypes from 'prop-types';

const Instructions = (props) => {
  const lines = props.instructions.split("-");
  return (
    <div className={styles.container}>
      <Lottie options={{ ...DEFAULT_LOTTIE_OPTIONS, animationData: Robot }} width={150} />
      <div className={styles.instructions}>
        {lines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

Instructions.propTypes = {
  instructions: PropTypes.string,
};

Instructions.defaultProps = {
  instructions: 'Hi! I am Tii',
};

export default Instructions;
