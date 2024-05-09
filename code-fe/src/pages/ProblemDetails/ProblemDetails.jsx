import React, { useEffect, useState, useRef, useContext } from 'react';
import styles from './ProblemDetails.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import MainNavbar from '~/components/Navbars/MainNavbar';
import Instructions from '~/components/Instructions/Instructions';
import Footer from '~/components/Footer';
import Button from '~/components/Buttons/Button';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { ProblemDetailsContext, ProblemDetailsProvider } from '~/context/ProblemDetails';
import ProblemBasicInfo from '~/components/ProblemDetails/ProblemBasicInfo';
import ProblemDescription from '~/components/ProblemDetails/ProblemDescription';
import ProblemParameters from '~/components/ProblemDetails/ProblemParameters';
import ProblemTestcase from '~/components/ProblemDetails/ProblemTestcase';
import { getAllTopics } from '~/services/ProblemService';

const ProblemDetails = () => {
  const location = useLocation();
  const { problem, setProblem, setAction, step, setStep, setDialogProps } = useContext(ProblemDetailsContext);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  useEffect(() => {
    setProblem(location.state?.problem);
    setAction(location.state?.action);
  }, []);
  useEffect(() => {
    localStorage.setItem('problem', JSON.stringify(problem));
    const scrollY = scrollRef.current ? scrollRef.current.scrollTop : window.scrollY;
    scrollY >= 200
      ? scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      : window.scrollTo({ top: 0, behavior: 'smooth' });

    console.log('scroll');
  }, [step]);

  const renderForm = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div className={styles.instructions}>
              <Instructions instructions="Hello! I'm Tii.-I will help you create a new problem.-Now let's enter the basic information of a problem.-Let's get started!"></Instructions>
            </div>
            <div className={styles.content}>
              <ProblemBasicInfo className={styles.basic_info}></ProblemBasicInfo>
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
              <Instructions instructions="Wonderful! -Let's proceed with the final step, -which is to create test cases for your problem."></Instructions>
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
    if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = (_) => {
    step > 0 ? setStep((prev) => prev - 1) : navigate('/profile', { state: { tab: 1 } });
  };

  const handleSubmit = (_) => {
    setDialogProps((prev) => ({
      ...prev,
      msg: 'Are you sure you want to create the new problem?',
      isOpen: true,
      onYesClick: () => {
        console.log('Submit', problem);
      },
    }));
  };

  return (
    <div className={styles.problem_details}>
      <MainNavbar></MainNavbar>
      <div ref={scrollRef} className={styles.container}>
        {renderForm()}
      </div>
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
  );
};

const ProblemDetailsWrapper = () => (
  <ProblemDetailsProvider>
    <ProblemDetails />
  </ProblemDetailsProvider>
);

export default ProblemDetailsWrapper;
