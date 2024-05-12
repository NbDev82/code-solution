import React, { useRef, useEffect, useState } from 'react';
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
  const [libraries, setLibraries] = useState([]);
  const dialogRef = useRef();
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
      const request = { problem, libraries, parameters, testcases };
      request.parameters.forEach((param) => {
        delete param.id;
      });
      request.testcases.forEach((testcase) => {
        delete testcase.id;
        testcase.input.forEach((input) => {
          delete input.paramId;
        });
      });
      console.log(JSON.stringify(request));
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

  const getDataTescasesToXLSX = (testcasesList) => {
    if (!testcasesList) return [];
    const data = [['testcase']];

    try {
      /*
        Nếu chưa có testcases thì khi download thì file .xlsx sẽ có sẵn 5 testcase mẫu
        Nếu testcases đã có dữ liệu thì theo dữ liệu của testcases mà tạo file
      */
      if (testcasesList.length === 0) {
        const input = [];
        for (let i = 0; i < 5; i++) {
          parameters.forEach((param) => {
            input.push({
              paramId: param?.id,
              paramName: param?.name,
              datatype: param?.datatype,
              value: generateDefaultValue(param?.datatype),
            });
          });
          testcasesList.push({
            id: testcases.length + 1,
            input: [...input],
            output: generateDefaultValue(problem?.outputDataType),
          });
          input.splice(0);
        }
      }
      parameters.forEach((param) => data.push([param?.name + `(${param?.datatype})`]));

      for (let i = 1; i <= testcasesList.length; i++) {
        data[0].push(i);
      }
      let inputValues = [];
      for (let i = 0; i < testcasesList.length; i++) {
        inputValues = testcasesList[i]?.input.map((param) => param.value);
        inputValues.forEach((value, index) => {
          data[index + 1].push(value);
        });
      }

      data.push([`output_data (${problem?.outputDataType})`]);
      for (let i = 0; i < testcasesList.length; i++) {
        data[data.length - 1].push(testcasesList[i]?.output);
      }
    } catch (error) {
      setDialogProps((prev) => ({
        ...prev,
        msg: 'Error convert data to file .xlsx:' + error,
        isOpen: true,
        onYesClick: () => {},
      }));
    }
    /*
      Data example:
      data = [
            ['testcase', 1, 2, 3, 4],
            ['x', 1, 2, 2, 2],
            ['y', 2, 2, 2, 2],
            ['z', 2, 2, 2, 2],
            ['output_data', 2, 3, 5, 6],
          ];
    */

    return data;
  };

  const getDataXLSXToTestcases = (dataXLSX) => {
    const testcasesList = [];
    const input = [];

    for (let i = 1; i <= dataXLSX[0].length - 1; i++) {
      parameters.forEach((param) => {
        input.push({
          paramId: param?.id,
          paramName: param?.name,
          datatype: param?.datatype,
          value: dataXLSX[param?.id][i],
        });
      });
      testcasesList.push({
        id: testcasesList.length + 1,
        input: [...input],
        output: dataXLSX[dataXLSX.length - 1][i],
      });
      input.splice(0);
    }
    if (getIdTestcasesInvalid(testcasesList).length > 0) return [];
    return testcasesList;
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
        libraries,
        setLibraries,
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
        getDataTescasesToXLSX,
        getDataXLSXToTestcases,
      }}
    >
      {children}
      <Dialog ref={dialogRef} dialogProps={dialogProps} setDialogProps={setDialogProps}></Dialog>
    </ProblemDetailsContext.Provider>
  );
}

export default ProblemDetailsProvider;
