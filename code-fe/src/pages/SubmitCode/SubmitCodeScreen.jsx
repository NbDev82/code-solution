import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProblemScreen from '~/components/Problem/ProblemScreen';
import EditorScreen from '~/components/Editor/EditorScreen';
import NavbarProblem from '~/components/Navbars/NavbarProblem/ProblemNavbar/NavbarProblem';
import TestCaseScreen from '~/components/TestCaseScreen/TestCaseScreen';
import MainNavbar from '~/components/Navbars/NavbarProblem/MainNavbar/MainNavbar';
import DiscussesScreen from '~/components/DiscussesProblem/DiscussesScreen';
import SubmissionScreen from '~/components/Submissions/SubmissionScreen';
import './SubmitCodeScreen.scss';
import { ProblemContext, ProblemProvider } from '~/context/Problem';
import { compileCode, runCode } from '~/services/SubmitCodeService';

function SubmitCodeScreen() {
  const location = useLocation();
  const { problem, setProblem, user, setResult, code, language, activeMenuItem, fetchProblem } =
    useContext(ProblemContext);

  const problemId = location.state?.problemId;
  useEffect(() => {
    fetchProblem(problemId).then((data) => {
      setProblem(data);
    });
  }, []);

  const handleSendCode = async () => {
    const request = {
      userId: user.id,
      code: code,
      language: language,
      problemId: problem.id,
    };
    try {
      const response = await runCode(request);
      setResult(response.data);
      console.log('Server response:', response.data);
    } catch (error) {
      setResult(error?.response?.data.message);
      console.error('Error sending code:', error.response.data.message);
    }
  };

  const handleCompile = async () => {
    const request = {
      userId: user.id,
      code: code,
      language: language,
      problemId: problem.id,
    };
    try {
      const response = await compileCode(request);
      setResult(response.data);
      console.log('Server response:', response.data);
    } catch (error) {
      setResult(error?.response?.data.message);
      console.error('Error compile code:', error.response.data.message);
    }
  };

  const handleSelectBtn = (id) => {
    if (id === 'compile') handleCompile();
    if (id === 'submit') handleSendCode();
  };

  const renderActiveScreen = (activeMenuItem) => {
    switch (activeMenuItem) {
      case 'Description':
        return <ProblemScreen />;
      case 'Discusses':
        return <DiscussesScreen />;
      case 'Submissions':
        return <SubmissionScreen />;
      default:
        break;
    }
  };

  return (
    <section>
      <div className="layout">
        <div className="nav__layout centered">
          <MainNavbar onSelectBtn={handleSelectBtn} />
        </div>

        <div className="nav__problem__layout centered">
          <NavbarProblem />
        </div>

        <div className="problem__layout">{renderActiveScreen(activeMenuItem)}</div>

        <div className="editor__layout">
          <EditorScreen />
        </div>

        <div className="testcases_layout">
          <TestCaseScreen />
        </div>
      </div>
    </section>
  );
}

const ProblemWrapper = () => (
  <ProblemProvider>
    <SubmitCodeScreen />
  </ProblemProvider>
);

export default ProblemWrapper;
