import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../ProblemDetails.module.scss';
import { ProblemDetailsContext } from '~/context/ProblemDetails';
import { Input, InputGroup, InputRightElement, Button, InputLeftElement } from '@chakra-ui/react';
import Datatype from '../Datatype/Datatype';
import { SmallAddIcon } from '@chakra-ui/icons';
import { MIN_PARAMETERS, MAX_PARAMETERS } from '~/utils/Const';
const ProblemParameters = (props) => {
  const {
    parameters,
    setParameters,
    quantityParam,
    setquantityParam,
    createNewParameters,
    testcases,
    setTestcases,
    setDialogProps,
  } = useContext(ProblemDetailsContext);
  const checkquantityParam = () => {
    return quantityParam >= MIN_PARAMETERS && quantityParam <= MAX_PARAMETERS && quantityParam !== '';
  };
  const [errorMsg, setErrorMsg] = useState('');
  const [paramError, setParamError] = useState([]);

  useEffect(() => {
    /*
      - Nếu lần thay đổi này có số lượng param khác so với số lượng parameters đang có
      và testcase đã đc nhập trước đó thì ta sẽ thông báo xác nhận và reset lại testcase
      - Nếu số lượng param nhập mới lớn hơn số parameters đang có,
      thì chỉ thêm số lượng cần cần thiết so với số param đang có
      - Nếu số lượng param nhập mới bé hơn số parameters đang có,
      thì thông báo xác nhận và reset lại
    */
    if (checkquantityParam()) {
      if (testcases.length > 0 && quantityParam - parameters.length !== 0) {
        setDialogProps((prev) => ({
          ...prev,
          msg: 'Your action may delete all of your test cases. Are you sure?',
          isOpen: true,
          onYesClick: () => {
            setTestcases([]);
          },
        }));
      }
      if (testcases.length === 0)
        if (quantityParam - parameters.length >= 0) {
          createNewParameters(quantityParam);
        } else {
          setParameters((prev) => prev.slice(0, quantityParam));
        }
      setErrorMsg('');
    } else {
      setErrorMsg(` Number of parameters must be between ${MIN_PARAMETERS} and ${MAX_PARAMETERS}`);
    }
  }, [quantityParam]);

  const getIdParamsSameName = (params) => {
    // Tìm những paramId có paramName giống nhau
    const paramNames = {};
    const duplicateIds = [];

    params.forEach((param) => {
      if (!paramNames[param.name]) {
        paramNames[param.name] = [param.id];
      } else {
        if (!duplicateIds.includes(param.id)) {
          duplicateIds.push(param.id);
        }
        paramNames[param.name].forEach((id) => {
          if (!duplicateIds.includes(id)) {
            duplicateIds.push(id);
          }
        });
        paramNames[param.name].push(param.id);
      }
    });
    return duplicateIds;
  };

  const handleOnChangeParameterName = (id, value) => {
    //Cập nhật params mới với id và value
    const updatedParameters = parameters.map((param) => {
      if (param?.id === id) {
        return { ...param, name: value };
      }
      return param;
    });

    //Kiểm tra lỗi trùng tên nhau giữa các param
    const existedParameterIds = getIdParamsSameName(updatedParameters);
    console.log('existedParameterIds', existedParameterIds);
    if (existedParameterIds.length === 0) {
      setErrorMsg('');
      setParamError([]);
    } else {
      setErrorMsg('The parameter names must not be the same.');
      setParamError(existedParameterIds);
    }
    console.log('paramError', paramError);
    setParameters(updatedParameters);
  };
  const handleOnChangeDatatype = (id, value) => {
    const updatedParameters = parameters.map((param) => {
      if (param?.id === id) {
        return { ...param, datatype: value };
      }
      return param;
    });
    setParameters(updatedParameters);
  };

  return (
    <div className={styles.container}>
      <div className={styles.row__layout}>
        <div className={styles.input__group}>
          <span>
            How many parameters does your problem have?
            <span className={styles.note}>{`(${MIN_PARAMETERS}-${MAX_PARAMETERS})`}</span>
          </span>
          <InputGroup justifyContent={'center'} alignItems={'center'}>
            <InputLeftElement h="40px" w={'10%'}>
              <Button
                p={6}
                backgroundColor="var(--gray)"
                color="var(--white)"
                _hover={{ bg: 'var(--gray-100)' }}
                onClick={() => {
                  quantityParam >= 1 ? setquantityParam((prev) => prev - 1) : setquantityParam(0);
                }}
              >
                -
              </Button>
            </InputLeftElement>
            <Input
              h="40px"
              variant="outline"
              placeholder="What is your title problem?"
              type="number"
              textAlign={'center'}
              value={quantityParam}
              disabled={true}
              isInvalid={checkquantityParam() ? false : true}
              onChange={(e) => {
                checkquantityParam() ? setquantityParam(parseInt(e.target.value)) : setquantityParam(MIN_PARAMETERS);
              }}
            />
            <InputRightElement h="40px" w={'10%'}>
              <Button
                p={6}
                backgroundColor="var(--gray)"
                color="var(--white)"
                _hover={{ bg: 'var(--gray-100)' }}
                onClick={() => {
                  quantityParam <= MAX_PARAMETERS - 1
                    ? setquantityParam((prev) => parseInt(prev) + 1)
                    : setquantityParam(MAX_PARAMETERS);
                }}
              >
                +
              </Button>
            </InputRightElement>
          </InputGroup>
        </div>
      </div>
      <div className={styles.row__layout}>
        <div className={styles.input__group}>
          <span className={styles.msg__error}>{errorMsg}</span>
        </div>
      </div>
      {checkquantityParam() && quantityParam !== '0' && quantityParam !== 0 ? (
        <div className={styles.row__layout}>
          <div className={styles.input__group}>
            <span>Please enter the data for the parameters of the problem:</span>
            <br></br>
          </div>
          {parameters.map((parameter, index) => (
            <div key={index} className={styles.input__group}>
              <span className={styles.note}>+ parameter {parameter?.id}:</span>
              <div className={styles.row__child}>
                <Input
                  w="40%"
                  h="40px"
                  variant="outline"
                  placeholder={'parameter ' + parameter?.id}
                  value={parameter?.name}
                  isInvalid={paramError.includes(parameter?.id) || parameter?.name === ''}
                  onChange={(e) => {
                    handleOnChangeParameterName(parameter?.id, e.target.value.trim());
                  }}
                />
                <Datatype
                  value={parameter?.datatype}
                  onChangeValue={(value) => {
                    handleOnChangeDatatype(parameter?.id, value);
                  }}
                ></Datatype>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

ProblemParameters.propTypes = {};

export default ProblemParameters;
