import React, { useEffect, useState } from 'react';
import styles from './ProblemDetails.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import MainNavbar from '~/components/Navbars/MainNavbar';
import Instructions from '~/components/Instructions/Instructions';
import Footer from '~/components/Footer';
import Button from '~/components/Buttons/Button';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { ProblemProvider } from '~/context/Problem';
import ProblemBasicInfo from '~/components/ProblemDetails/ProblemBasicInfo';
import ProblemDescription from '~/components/ProblemDetails/ProblemDescription';
import ProblemParameters from '~/components/ProblemDetails/ProblemParameters';
import ProblemTestcase from '~/components/ProblemDetails/ProblemTestcase';
import { getAllTopics } from '~/services/ProblemService';
import { getCurrentUserDetail } from '~/auth';
const ProblemDetails = () => {
  const location = useLocation();
  const [user, setUser] = useState(getCurrentUserDetail());
  const [topics, setTopics] = useState([]);
  const [problem, setProblem] = useState(location.state?.problem);
  const [action, setAction] = useState(location.state?.action);
  const [step, setStep] = useState(0);
  const [parameters, setParameters] = useState([]);
  const [testcases, setTestcases] = useState([]);
  const navigate = useNavigate();

  const fetchTopics = async () => {
    try {
      const response = await getAllTopics();
      setTopics(response.data);
    } catch (error) {
      console.log('Fetch Topics Error', error);
    }
  };
  useEffect(() => {
    fetchTopics();
  }, []);

  console.log(problem);
  console.log(parameters);
  console.log(action);

  const renderForm = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div className={styles.instructions}>
              <Instructions instructions="Hello! I'm Tii.-I will help you create a new problem.-Now let's enter the basic information of a problem.-Let's get started!"></Instructions>
            </div>
            <div className={styles.content}>
              <ProblemBasicInfo topics={topics} className={styles.basic_info}></ProblemBasicInfo>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className={styles.instructions}>
              <Instructions instructions="Great job!-Next, let's create a description for your problem."></Instructions>
            </div>
            <div className={styles.content}>
              <ProblemDescription></ProblemDescription>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className={styles.instructions}>
              <Instructions instructions="Next, let's create the parameters for the problem!"></Instructions>
            </div>
            <div className={styles.content}>
              <ProblemParameters></ProblemParameters>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className={styles.instructions}>
              <Instructions instructions="Hello! I'm Tii.-I will help you create a new problem.-Now let's enter the basic information of a problem.-Let's get started!"></Instructions>
            </div>
            <div className={styles.content}>
              <ProblemTestcase></ProblemTestcase>
            </div>
          </>
        );
      default:
        break;
    }
  };

  const handleContinue = (_) => {
    if (step < 3) setStep((prev) => prev + 1);
  };

  const handleBack = (_) => {
    step > 0 ? setStep((prev) => prev - 1) : navigate('/profile', { state: { tab: 1 } });
  };

  const handleSubmit = (_) => {
    console.log(problem);
  };
  return (
    <ProblemProvider
      value={{
        problem,
        setProblem,
        parameters,
        setParameters,
        testcases,
        setTestcases,
      }}
    >
      <div className={styles.problem_details}>
        <MainNavbar></MainNavbar>
        <div className={styles.container}>{renderForm()}</div>
        <div className={styles.bot_layout}>
          <Button id="continuteBtn" link onClick={handleBack}>
            <ArrowBackIcon />
            <span>Back </span>
          </Button>
          {step === 3 ? (
            <Button id="submitBtn" highlight onClick={handleSubmit}>
              <span>Submit</span>
              <ArrowForwardIcon />
            </Button>
          ) : (
            <Button id="continuteBtn" highlight onClick={handleContinue}>
              <span>Continute </span>
              <ArrowForwardIcon />
            </Button>
          )}
        </div>

        <Footer></Footer>
      </div>
    </ProblemProvider>
  );
};

export default ProblemDetails;
