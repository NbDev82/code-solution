import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ProblemDetailsContext from './ProblemDetailsContext';
import { getCurrentUserDetail } from '~/auth';
import { getAllTopics } from '~/services/ProblemService';
import { PROBLEM_INIT, DIALOG_DEFAULT_PROPS } from '~/utils/Const';
import Dialog from '~/components/Dialog';
function ProblemDetailsProvider({ children }) {
  const [user, setUser] = useState(getCurrentUserDetail());
  const [topics, setTopics] = useState([]);
  const [problem, setProblem] = useState(PROBLEM_INIT);
  const [action, setAction] = useState('');
  const [step, setStep] = useState(0);
  const [parameters, setParameters] = useState([]);
  const [quantityParam, setquantityParam] = useState(parameters.length);
  const [testcases, setTestcases] = useState([]);
  const [dialogMsg, setDialogMsg] = useState('안년하세요? 제 이름은 디이예요.');
  const [dialogProps, setDialogProps] = useState({ ...DIALOG_DEFAULT_PROPS, isOpen: true, msg: dialogMsg });
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

  const createNewTestCase = () => {
    const input = [];
    parameters.forEach((param) => {
      input.push({
        paramId: param?.id,
        paramName: param?.name,
        value: '',
      });
    });
    return {
      id: testcases.length + 1,
      input: input,
      output: '',
    };
  };

  const createNewParameters = (quantity) => {
    const newParametersList = [...parameters];
    for (let i = parameters.length + 1; i <= quantityParam; i++) {
      newParametersList.push({
        id: i,
        name: 'param' + i,
        datatype: 'int',
      });
    }
    setParameters(newParametersList);
  };

  useEffect(() => {}, [testcases]);

  useEffect(() => {
    console.log('Problem Change:', { ...problem, parameters, testcases });
  }, [problem, parameters, testcases]);

  const handleYesClick = () => {
    setDialogProps((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ProblemDetailsContext.Provider
      value={{
        user,
        setUser,
        action,
        setAction,
        problem,
        setProblem,
        topics,
        setTopics,
        step,
        setStep,
        parameters,
        setParameters,
        testcases,
        setTestcases,
        createNewTestCase,
        quantityParam,
        setquantityParam,
        createNewParameters,
        dialogProps,
        setDialogProps,
      }}
    >
      {children}
      <Dialog dialogProps={dialogProps} setDialogProps={setDialogProps}></Dialog>
    </ProblemDetailsContext.Provider>
  );
}

export default ProblemDetailsProvider;
