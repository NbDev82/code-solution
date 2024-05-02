import React, { useState } from 'react';
import styles from './ProblemDetails.module.scss';
import { useLocation } from 'react-router-dom';

const ProblemDetails = () => {
  const location = useLocation();
  const [problem, setProblem] = useState(location.state?.problem);
  const [action, setAction] = useState(location.state?.action);
  console.log(problem);
  console.log(action);
  return <div>
    
  </div>;
};

export default ProblemDetails;
