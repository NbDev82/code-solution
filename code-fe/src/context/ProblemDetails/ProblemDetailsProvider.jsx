import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ProblemDetailsContext from './ProblemDetailsContext';
import { getCurrentUserDetail } from '~/auth';
import {
  getAllTopics,
  addProblem as addProblemService,
  updateProblem as updateProblemService,
} from '~/services/ProblemService';
import { PROBLEM_INIT, DIALOG_DEFAULT_PROPS } from '~/utils/Const';
import Dialog from '~/components/Dialog';
import { checkParameterName, generateDefaultValue, checkInputValidation } from '~/utils/string';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';

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
  const [dialogProps, setDialogProps] = useState({ ...DIALOG_DEFAULT_PROPS, msg: dialogMsg });
  const [paramsError, setParamsError] = useState([]);
  const navigate = useNavigate();
  const fetchTopics = async () => {
    try {
      const response = await getAllTopics();
      setTopics(response.data);
    } catch (error) {
      console.log('Fetch Topics Error', error);
    }
  };

  const updateProblem = async () => {
    try {
      const request = queryString.stringify({ problem, parameters, testcases });
      console.log(JSON.stringify({ problem, parameters, testcases }));
      const response = await updateProblemService(request);
      let msg = '';
      response.data.success ? (msg = `${action} successful!`) : (msg = `${action} failed!`);
      setDialogProps((prev) => ({
        ...prev,
        msg: msg,
        isOpen: true,
        onYesClick: () => {
          navigate(`/profile`, {
            state: { tab: 1 },
          });
        },
      }));
    } catch (error) {
      setDialogProps((prev) => ({
        ...prev,
        msg: 'Error update problem:' + error,
        isOpen: true,
        onYesClick: () => {
          navigate(`/profile`, {
            state: { tab: 1 },
          });
        },
      }));
    }
  };

  const addProblem = async () => {
    try {
      const request = queryString.stringify({ problem, parameters, testcases });
      console.log(JSON.stringify({ problem, parameters, testcases }));
      const response = await addProblemService(request);
      return response.data;
    } catch (error) {
      setDialogProps((prev) => ({
        ...prev,
        msg: 'Error add problem:' + error,
        isOpen: true,
        onYesClick: () => {
          navigate(`/profile`, {
            state: { tab: 1 },
          });
        },
      }));
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
        datatype: param?.datatype,
        value: generateDefaultValue(param?.datatype),
      });
    });
    setTestcases((prev) => [
      ...prev,
      {
        id: testcases.length + 1,
        input: input,
        output: generateDefaultValue(problem?.outputDataType),
      },
    ]);
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

  /*
    Tìm những ParamId không hợp lệ (trùng tên, sai quy tắt tên biến)
    input: danh sách param
    output: [paramId,...]
  */
  const getIdParamsInvalid = (params) => {
    if (!params) return [];
    const paramNames = {};
    const invalidIds = [];

    params.forEach((param) => {
      if (!paramNames[param?.name]) {
        paramNames[param?.name] = [param?.id];
        if (!checkParameterName(param?.name)) invalidIds.push(param?.id);
      } else {
        if (!invalidIds.includes(param?.id)) {
          invalidIds.push(param?.id);
        }
        paramNames[param?.name].forEach((id) => {
          if (!invalidIds.includes(id)) {
            invalidIds.push(id);
          }
        });
        paramNames[param?.name].push(param?.id);
      }
    });
    return invalidIds;
  };

  /*
    Tìm những ParamId có giá trị không hợp lệ(rỗng) của TestCaseId
    input: danh sách testcase
    output: [testcaseID:'',...]
  */
  const getIdTestcasesInvalid = (testcases) => {
    if (!testcases) return [];
    const invalidIds = [];

    testcases.forEach((t) => {
      if (!t || t?.output === '' || !checkInputValidation(problem?.outputDataType, t?.output)) {
        if (t) {
          invalidIds.push(t?.id);
        }
        return;
      }
      if (t?.input) {
        t?.input.forEach((i) => {
          if (!i || i?.value === '' || !checkInputValidation(i?.datatype, i?.value)) {
            invalidIds.push(t?.id);
            return;
          }
        });
      }
    });
    return invalidIds;
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
        getIdParamsInvalid,
        paramsError,
        setParamsError,
        getIdTestcasesInvalid,
        addProblem,
        updateProblem,
      }}
    >
      {children}
      <Dialog dialogProps={dialogProps} setDialogProps={setDialogProps}></Dialog>
    </ProblemDetailsContext.Provider>
  );
}

export default ProblemDetailsProvider;
