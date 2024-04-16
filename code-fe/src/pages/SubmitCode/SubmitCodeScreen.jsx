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
import queryString from 'query-string';
import { getProblem } from '~/services/ProblemService';
import { getCurrentUserDetail } from '~/auth';
import { ProblemContext, ProblemProvider } from '~/context/Problem';

function SubmitCodeScreen() {
  const [result, setResult] = useState({});
  const [activeMenuItem, setActiveMenuItem] = useState('Description');
  const [problem, setProblem] = useState({});
  const [user, setUser] = useState(getCurrentUserDetail());
  const location = useLocation();
  const problemId = location.state?.problemId;
  useEffect(() => {
    fetchProblem(problem.id).then((data) => {
      setProblem(data);
    });
  }, []);

  const fetchProblem = async (problemId) => {
    try {
      const response = await getProblem(queryString.stringify({ problemId }));
      return response.data;
    } catch (error) {
      console.error('Error fetching problem:', error);
      return error.response?.data?.message;
    }
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
    <ProblemProvider
      value={{
        result,
        setResult,
        problem,
        setProblem,
        activeMenuItem,
        setActiveMenuItem,
        user,
        setUser,
      }}
    >
      <section>
        <div className="layout">
          <div className="nav__layout centered">
            <MainNavbar />
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
    </ProblemProvider>
  );
}

export default SubmitCodeScreen;
