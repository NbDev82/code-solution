import React, { useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ProblemDetailsContext } from '~/context/ProblemDetails';
import {
  Input,
  Menu,
  MenuList,
  MenuButton,
  Button,
  MenuItemOption,
  MenuOptionGroup,
  HStack,
  useRadioGroup,
} from '@chakra-ui/react';
import { ChevronDownIcon, SmallCloseIcon } from '@chakra-ui/icons';
import styles from '../ProblemDetails.module.scss';
import Datatype from '../Datatype/Datatype';
import { DIFFICULTY_DEFAULT } from '~/utils/Const';
import { normalizeName, generateFunctionName } from '~/utils/string';
import RadioCard from '~/components/Buttons/Radio';
const ProblemBasicInfo = (props) => {
  const { problem, setProblem,topics } = useContext(ProblemDetailsContext);
  const [titleDifficulty, setTitleDifficulty] = useState(normalizeName(problem?.difficulty));
  const inputFuncName = useRef(null);
  const [optFuncName, setOptFuncName] = useState('default');
  const handleTopicsOnChange = (values) => {
    setProblem((prev) => ({ ...prev, topics: values }));
  };

  const onRemoveTopic = (value) => {
    const topics = problem?.topics.filter((item) => item !== value);
    setProblem((prev) => ({ ...prev, topics: topics }));
  };
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'default',
    onChange: setOptFuncName,
  });

  return (
    <div className={styles.container}>
      <div className={styles.row__layout}>
        <div className={styles.input__group}>
          <span>What is your title problem?</span>
          <Input
            w="100%"
            h="40px"
            variant="outline"
            placeholder="What is your title problem?"
            value={problem?.title}
            isInvalid={problem?.title === '' ? true : false}
            onChange={(e) => {
              optFuncName === 'default'
                ? setProblem((prev) => ({
                    ...prev,
                    title: e.target.value,
                    functionName: generateFunctionName(e.target.value.trim()),
                  }))
                : setProblem((prev) => ({
                    ...prev,
                    title: e.target.value.trim(),
                  }));
            }}
          />
        </div>
      </div>
      <div className={styles.row__layout}>
        <div className={styles.input__group}>
          <span>What is the function name of your problem?</span>
          <HStack {...getRootProps()}>
            <RadioCard {...getRadioProps({ value: 'default' })}>Default</RadioCard>
            <RadioCard {...getRadioProps({ value: 'customize' })}>Customize</RadioCard>
          </HStack>
          <Input
            useRef={inputFuncName}
            w="100%"
            h="40px"
            isDisabled={optFuncName === 'default' ? true : false}
            variant="outline"
            placeholder="What is the function name of your problem?"
            value={problem?.functionName}
            isInvalid={problem?.functionName === '' ? true : false}
            onChange={(e) => {
              setProblem((prev) => ({ ...prev, functionName: e.target.value.trim() }));
            }}
          />
        </div>
      </div>
      <div className={styles.row__layout}>
        <div className={styles.input__group}>
          <span>What is the return data of the above function?</span>
          <Datatype
            value={problem.outputDataType}
            onChangeValue={(value) => {
              setProblem((prev) => ({ ...prev, outputDataType: value }));
            }}
          ></Datatype>
        </div>
      </div>
      <div className={styles.row__layout}>
        <div className={styles.input__group}>
          <span>How difficult is your problem?</span>
          <Menu closeOnSelect={false} className="menu">
            <MenuButton
              className="menu__btn"
              as={Button}
              rightIcon={<ChevronDownIcon fontSize="16px" />}
              px={10}
              py={8}
              transition="all 0.2s"
              borderRadius="var(--radius-size-smallsmall)"
              borderWidth="0.5px"
              fontSize="16px"
              backgroundColor="var(--gray)"
              color="var(--white)"
              _hover={{ bg: 'var(--gray-100)' }}
              _expanded={{ bg: 'var(--gray-300)', color: 'var(--white)' }}
            >
              {titleDifficulty}
            </MenuButton>
            <MenuList minWidth="160px" boxShadow="var(--box-shadow)">
              <MenuOptionGroup value={problem?.difficulty} type="radio">
                {DIFFICULTY_DEFAULT.map((value, index) => (
                  <MenuItemOption
                    key={index}
                    value={value}
                    onClick={() => {
                      setTitleDifficulty(normalizeName(value));
                      setProblem((prev) => ({ ...prev, difficulty: value }));
                    }}
                  >
                    {normalizeName(value)}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </div>
      </div>
      <div className={styles.row__layout}>
        <div className={styles.input__group}>
          <span>What topics does your problem belong to?</span>
          <Menu closeOnSelect={false} className="menu">
            <MenuButton
              className="menu__btn"
              as={Button}
              rightIcon={<ChevronDownIcon fontSize="16px" />}
              px={10}
              py={8}
              transition="all 0.2s"
              borderRadius="var(--radius-size-smallsmall)"
              borderWidth="0.5px"
              fontSize="16px"
              backgroundColor="var(--gray)"
              color="var(--white)"
              _hover={{ bg: 'var(--gray-100)' }}
              _expanded={{ bg: 'var(--gray-300)', color: 'var(--white)' }}
            >
              Topics
            </MenuButton>

            <MenuList minWidth="160px" maxH={"200px"} overflow='scroll' boxShadow="var(--box-shadow)">
              <MenuOptionGroup type="checkbox" onChange={handleTopicsOnChange} value={problem?.topics}>
                {topics.map((topic, index) => (
                  <MenuItemOption key={index} value={topic}>
                    {normalizeName(topic)}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          {problem?.topics.length !== 0 ? (
            <HStack className={styles.topics}>
              {problem?.topics.map((topic) => (
                <div className={styles.item} key={topic}>
                  <span>{topic.toLowerCase()}</span>
                  <SmallCloseIcon
                    cursor="pointer"
                    color="var(--red)"
                    onClick={() => onRemoveTopic(topic)}
                  ></SmallCloseIcon>
                </div>
              ))}
            </HStack>
          ) : null}
        </div>
      </div>
    </div>
  );
};

ProblemBasicInfo.propTypes = {
  topics: PropTypes.array,
};

ProblemBasicInfo.defaultProps = {
  topics: [],
};

export default ProblemBasicInfo;
