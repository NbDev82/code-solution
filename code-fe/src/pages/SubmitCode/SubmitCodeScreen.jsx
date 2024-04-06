import React, { createContext, useEffect, useState } from 'react';
import ProblemScreen from '~/components/Problem/ProblemScreen';
import EditorScreen from '~/components/Editor/EditorScreen';
import NavbarProblem from '~/components/Navbars/NavbarProblem/ProblemNavbar/NavbarProblem';
import TestCaseScreen from '~/components/TestCaseScreen/TestCaseScreen';
import MainNavbar from '~/components/Navbars/NavbarProblem/MainNavbar/MainNavbar';
import DiscussesScreen from '~/components/DiscussesProblem/DiscussesScreen';
import SubmissionScreen from '~/components/Submissions/SubmissionScreen';
import './SubmitCodeScreen.scss';
import axios from 'axios';

export const AppContext = createContext(null);

function SubmitCodeScreen() {
  const [result, setResult] = useState('');
  const [activeMenuItem, setActiveMenuItem] = useState('Description');
  const [problem, setProblem] = useState('');
  const [problemId, setProblemId] = useState('');
  const [problemName, setProblemName] = useState('Missing-Number');
  const [userId, setUserId] = useState(0);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('java');

  useEffect(() => {
    fetchProblem(problemName).then((data) => {
      console.log(data);
      setProblem(data);
      setProblemId(data.id);
      setProblemName(data.name);
    });
    setUserId(1);
  }, []);

  const fetchProblem = async (problemName) => {
    try {
      const response = await axios.get('http://localhost:8000/api/problems/' + problemName);
      return response.data;
    } catch (error) {
      console.error('Error fetching problem:', error);
      return error.response?.data?.message;
    }
  };

  const renderActiveScreen = () => {
    switch (activeMenuItem) {
      case 'Description':
        return <ProblemScreen />;
      case 'Discusses':
        return <DiscussesScreen />;
      case 'Submissions':
        return <SubmissionScreen />;
    }
  };

  const handleCode = (action) => {
    const request = {
      userId: userId, // will amend soon
      code: code,
      language: language,
      problemId: problemId, // will amend soon
    };

    axios
      .post('http://localhost:8000/api/submit-code/' + action, request)
      .then((response) => {
        setResult(response.data);
        console.log('Server response:', response.data);
      })
      .catch((error) => {
        setResult(error?.response?.data.message);
        console.error('Error sending code:', error.response.data.message);
      });
  };

  const handleCompileCode = () => {
    const request = {
      userId: userId, // will amend soon
      code: code,
      language: language,
      problemId: problemId, // will amend soon
    };

    axios
      .post('http://localhost:8000/api/submit-code/compile', request)
      .then((response) => {
        setResult(response.data);
        console.log('Server response:', response.data);
      })
      .catch((error) => {
        setResult(error?.response?.data.message);
        console.error('Error sending code:', error.response.data.message);
      });
  };

  const handleSelectedBtn = (type) => {
    handleCode(type);
  };

  return (
    <AppContext.Provider
      value={{
        result,
        setResult,
        activeMenuItem,
        setActiveMenuItem,
        problem,
        setProblem,
        problemId,
        setProblemId,
        userId,
        setUserId,
        problemName,
        setProblemName,
        code,
        setCode,
        language,
        setLanguage,
      }}
    >
      <section>
        <div className="layout">
          <div className="nav__layout centered">
            <MainNavbar onSelectBtn={handleSelectedBtn} />
          </div>

          <div className="nav__problem__layout centered">
            <NavbarProblem />
          </div>

          <div className="problem__layout">{renderActiveScreen()}</div>

          <div className="editor__layout">
            <EditorScreen />
          </div>

          <div className="testcases_layout">
            <TestCaseScreen />
          </div>
        </div>
      </section>
    </AppContext.Provider>
  );
}

export default SubmitCodeScreen;
