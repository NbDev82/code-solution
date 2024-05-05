import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../ProblemDetails.module.scss';
import { ProblemContext } from '~/context/Problem';
import { Input } from '@chakra-ui/react';
import Datatype from '../Datatype/Datatype';
const ProblemParameters = (props) => {
  const { parameters, setParameters } = useContext(ProblemContext);
  const [quantity, setQuantity] = useState(1);
  const checkQuantity = () => {
    return quantity >= 1 && quantity <= 10;
  };
  useEffect(() => {
    if (checkQuantity()) {
      const newParametersList = Array.from({ length: quantity }, (_, index) => ({
        id: index + 1,
        name: 'param' + (index + 1),
        datatype: 'int',
      }));
      setParameters(newParametersList);
    }
  }, [quantity]);

  const handleOnChangeParameterName = (id, value) => {
    const updatedParameters = parameters.map((param) => {
      if (param.id === id) {
        return { ...param, name: value };
      }
      return param;
    });
    setParameters(updatedParameters);
  };
  const handleOnChangeDatatype = (id, value) => {
    const updatedParameters = parameters.map((param) => {
      if (param.id === id) {
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
            How many parameters does your problem have?<span className={styles.note}>{'(1-10)'}</span>
          </span>
          <Input
            w="100%"
            h="40px"
            variant="outline"
            placeholder="What is your title problem?"
            type="number"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
          {checkQuantity() ? (
            <></>
          ) : (
            <span className={styles.msg__error}>Number of parameters must be between 1 and 10</span>
          )}
        </div>
      </div>
      {checkQuantity() ? (
        <div className={styles.row__layout}>
          <div className={styles.input__group}>
            <span>Please enter the data for the parameters of the problem:</span>
          </div>
          {parameters.map((parameter, index) => (
            <div key={index} className={styles.input__group}>
              <span className={styles.note}>+ parameter {parameter.id}:</span>
              <div className={styles.row__child}>
                <Input
                  w="40%"
                  h="40px"
                  variant="outline"
                  placeholder={'parameter ' + parameter.id}
                  value={parameter.name}
                  onChange={(e) => {
                    handleOnChangeParameterName(parameter.id, e.target.value);
                  }}
                />
                <Datatype
                  onChangeValue={(value) => {
                    handleOnChangeDatatype(parameter.id, value);
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
