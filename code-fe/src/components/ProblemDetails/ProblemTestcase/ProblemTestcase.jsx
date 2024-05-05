import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import styles from '../ProblemDetails.module.scss';
import { ProblemContext } from '~/context/Problem';
const ProblemTestcase = props => {
    const { problem, setProblem } = useContext(ProblemContext);
    return (
        <div>
            testcase
        </div>
    );
};

ProblemTestcase.propTypes = {
    
};

export default ProblemTestcase;