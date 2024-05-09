import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../ProblemDetails.module.scss';
import { ProblemDetailsContext } from '~/context/ProblemDetails';
import { generateDefaultValue } from '~/utils/string';
import { Input, Button } from '@chakra-ui/react';

const ProblemTestcase = (props) => {
  const { problem, parameters, testcases, setTestcases, createNewTestCase } = useContext(ProblemDetailsContext);
  const handleOnChangeParamValue = (testcaseId, paramId, value) => {
    const testcaseList = [...testcases];
    testcaseList.forEach((item) => {
      if (item.id === testcaseId) {
        const foundinput = item.input.find((i) => i.paramId === paramId);
        if (foundinput) {
          foundinput.value = value;
        }
      }
    });
    setTestcases(testcaseList);
  };

  const handleOnChangeOutputValue = (testcaseId, value) => {
    const updatedTestcases = [...testcases];
    const foundTestcase = updatedTestcases.find((testcase) => testcase?.id === testcaseId);
    if (foundTestcase) {
      foundTestcase.output = value;
    }
    setTestcases(updatedTestcases);
  };

  const handleRemoveTestcase = (id) => {
    const testcaseList = testcases.filter((testcase) => testcase?.id !== id);
    setTestcases(testcaseList);
  };

  return (
    <div className={styles.container}>
      {testcases.length === 0 ? (
        <></>
      ) : (
        testcases.map((testcase, index) => (
          <div className={styles.row__layout} key={index}>
            <div className={styles.input__group}>
              <span>
                <span className={styles.close__text} onClick={() => handleRemoveTestcase(testcase?.id)}>
                  -
                </span>{' '}
                TestCase {testcase?.id}
              </span>
            </div>
            {testcase?.input.map((paramValue, index) => (
              <div key={paramValue?.paramName + index + paramValue?.paramId} className={styles.row__child}>
                <span className={styles.note}>
                  {'+ '} {paramValue?.paramName}
                  {' (' + parameters[paramValue?.paramId - 1]?.datatype + ')'}:
                </span>
                <div className={styles.row__child}>
                  <Input
                    w="100%"
                    h="40px"
                    variant="outline"
                    placeholder={'parameter value ' + paramValue?.paramId}
                    value={paramValue?.value}
                    onChange={(e) => {
                      handleOnChangeParamValue(testcase?.id, paramValue?.paramId, e.target.value.trim());
                    }}
                  />
                </div>
              </div>
            ))}
            <div className={styles.row__child}>
              <span className={styles.note__organe}># Output{' (' + problem?.outputDataType + ')'}:</span>
              <div className={styles.row__child}>
                <Input
                  w="100%"
                  h="40px"
                  variant="outline"
                  placeholder={'output testcase ' + testcase?.id}
                  value={testcase?.output}
                  onChange={(e) => {
                    handleOnChangeOutputValue(testcase?.id, e.target.value.trim());
                  }}
                />
              </div>
            </div>
          </div>
        ))
      )}

      <div className={styles.row__layout}>
        <Button
          onClick={() => {
            setTestcases((prev) => [...prev, createNewTestCase()]);
          }}
        >
          New Testcase
        </Button>
      </div>
    </div>
  );
};

ProblemTestcase.propTypes = {};

export default ProblemTestcase;
