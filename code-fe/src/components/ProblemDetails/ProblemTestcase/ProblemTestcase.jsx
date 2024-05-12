import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../ProblemDetails.module.scss';
import { ProblemDetailsContext } from '~/context/ProblemDetails';
import { generateDefaultValue, checkInputValidation, shortenString } from '~/utils/string';
import { Input } from '@chakra-ui/react';
import XLSXUploader from '~/components/Xlsx/XLSXUploader';
import XLSXDownloader from '~/components/Xlsx/XLSXDownloader';
import Button from '~/components/Buttons/Button';
import { SmallAddIcon } from '@chakra-ui/icons';
const ProblemTestcase = (props) => {
  const { problem, testcases, setTestcases, createNewTestCase, getDataTescasesToXLSX } =
    useContext(ProblemDetailsContext);

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
      <div className={styles.row__layout}>
        <div className={styles.input__group}>
          <div className={styles.row__child}>* The test cases can be generated from a .xlsx file.</div>
          <div className={styles.row__child}>
            <span>* Please</span>
            <XLSXDownloader title="download" data={getDataTescasesToXLSX([...testcases])} filename="testcases.xlsx" />
            <span> the sample file .xlsx and enter the data</span>
          </div>

          <div className={styles.row__child}>
            <span>* Then, upload it here.</span>
          </div>
        </div>
        <div className={styles.input__group}>
          <XLSXUploader title="Upload file .xlsx"></XLSXUploader>
        </div>
      </div>

      <div className={styles.testcases__container}>
        {testcases.map((testcase, index) => (
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
              <div key={paramValue?.paramName}>
                {' '}
                <div className={styles.row__child}>
                  <span className={styles.note}>
                    {'+ '} {paramValue?.paramName}
                    {' (' + paramValue?.datatype + ')'}:
                  </span>
                  <Input
                    htmlSize={10}
                    width="auto"
                    h="40px"
                    variant="outline"
                    placeholder={paramValue?.datatype}
                    value={paramValue?.value}
                    isInvalid={
                      paramValue?.value === '' || !checkInputValidation(paramValue?.datatype, paramValue?.value)
                    }
                    onChange={(e) => {
                      handleOnChangeParamValue(testcase?.id, paramValue?.paramId, e.target.value.trim());
                    }}
                  />
                </div>
                <div className={styles.row__child}>
                  {!checkInputValidation(paramValue?.datatype, paramValue?.value) ? (
                    <span className={styles.msg__error}>
                      '{shortenString(paramValue?.value, 5)}' input invalid. input sample{'('}
                      {paramValue?.datatype}
                      {')'} = {generateDefaultValue(paramValue?.datatype)}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
            <div className={styles.row__child}>
              <span className={styles.note__organe}># Output{' (' + problem?.outputDataType + ')'}:</span>
              <Input
                htmlSize={10}
                width="auto"
                h="40px"
                variant="outline"
                placeholder={problem?.outputDataType}
                value={testcase?.output}
                isInvalid={testcase?.output === ''}
                onChange={(e) => {
                  handleOnChangeOutputValue(testcase?.id, e.target.value.trim());
                }}
              />
            </div>
            <div className={styles.row__child}>
              {!checkInputValidation(problem?.outputDataType, testcase?.output) ? (
                <span className={styles.msg__error}>
                  '{shortenString(testcase?.output, 5)}' input invalid. input sample{'('}
                  {problem?.outputDataType}
                  {')'} = {generateDefaultValue(problem?.outputDataType)}
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.row__layout}>
        <Button
          icon
          onClick={() => {
            createNewTestCase();
          }}
        >
          New Testcase
          <SmallAddIcon></SmallAddIcon>
        </Button>
      </div>
    </div>
  );
};

ProblemTestcase.propTypes = {};

export default ProblemTestcase;
