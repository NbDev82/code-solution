import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from '../ProblemDetails.module.scss';
import { ProblemDetailsContext } from '~/context/ProblemDetails';
import { Textarea } from '@chakra-ui/react';
const ProblemDescription = (props) => {
  const { problem, setProblem } = useContext(ProblemDetailsContext);
  return (
    <div className={styles.container}>
      <div className={styles.row__layout}>
        <div className={styles.input__group}>
          <span>What is the description of your problem?</span>
          <Textarea
            value={problem.description}
            onChange={(e) => {
              setProblem((prev) => ({ ...prev, description: e.target.value }));
            }}
            isInvalid={problem.description === '' ? true : false}
            minH="200px"
            placeholder="What is the description of your problem?"
          ></Textarea>
        </div>
      </div>
    </div>
  );
};

ProblemDescription.propTypes = {};

export default ProblemDescription;
