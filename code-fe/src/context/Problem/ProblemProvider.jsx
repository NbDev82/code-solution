import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ProblemContext from './ProblemContext';
import { getCurrentUserDetail } from '~/auth';
import { getProblem } from '~/services/ProblemService';
import queryString from 'query-string';

function ProblemProvider({ children }) {
  const [result, setResult] = useState({});
  const [activeMenuItem, setActiveMenuItem] = useState('Description');
  const [problem, setProblem] = useState({});
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('java');
  const [user, setUser] = useState(getCurrentUserDetail());

  const fetchProblem = async (problemId) => {
    try {
      const response = await getProblem(queryString.stringify({ problemId }));
      return response.data;
    } catch (error) {
      console.error('Error fetching problem:', error);
      return error.response?.data?.message;
    }
  };

  return (
    <ProblemContext.Provider
      value={{
        result,
        setResult,
        problem,
        setProblem,
        activeMenuItem,
        setActiveMenuItem,
        user,
        setUser,
        code,
        setCode,
        language,
        setLanguage,
        fetchProblem,
      }}
    >
      {children}
    </ProblemContext.Provider>
  );
}

export default ProblemProvider;
