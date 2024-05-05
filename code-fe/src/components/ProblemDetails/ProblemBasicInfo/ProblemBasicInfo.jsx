import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { ProblemContext } from '~/context/Problem';
import {
  Input,
  Menu,
  MenuList,
  MenuButton,
  Button,
  MenuItemOption,
  MenuOptionGroup,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { ChevronDownIcon, SmallCloseIcon } from '@chakra-ui/icons';
import styles from '../ProblemDetails.module.scss';
import Datatype from '../Datatype/Datatype';
import { DIFFICULTY_DEFAULT } from '~/utils/Const';
import { normalizeName,generateFunctionName } from '~/utils/string';
const ProblemBasicInfo = (props) => {
  const { problem, setProblem } = useContext(ProblemContext);
  const [titleDifficulty, setTitleDifficulty] = useState(normalizeName(problem.difficulty));
  const handleTopicsOnChange = (values) => {
    setProblem((prev) => ({ ...prev, topics: values }));
  };

  const onRemoveTopic = (value) => {
    const topics = problem.topics.filter((item) => item !== value);
    setProblem((prev) => ({ ...prev, topics: topics }));
  };

 

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
            value={problem.title}
            isInvalid={problem.title === '' ? true : false}
            onChange={(e) => {
              setProblem((prev) => ({
                ...prev,
                title: e.target.value,
                functionName: generateFunctionName(e.target.value),
              }));
            }}
          />
        </div>
      </div>
      <div className={styles.row__layout}>
        <div className={styles.input__group}>
          <span>What is the function name of your problem?</span>
          <Input
            w="100%"
            h="40px"
            variant="outline"
            placeholder="What is the function name of your problem?"
            value={problem.functionName}
            isInvalid={problem.functionName === '' ? true : false}
            onChange={(e) => {
              setProblem((prev) => ({ ...prev, functionName: e.target.value }));
            }}
          />
        </div>
      </div>
      <div className={styles.row__layout}>
        <div className={styles.input__group}>
          <span>What is the return data of the above function?</span>
          <Datatype
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
              <MenuOptionGroup value={problem.difficulty} type="radio">
                {DIFFICULTY_DEFAULT.map((value, index) => (
                  <MenuItemOption
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

            <MenuList minWidth="160px" boxShadow="var(--box-shadow)">
              <MenuOptionGroup type="checkbox" onChange={handleTopicsOnChange} value={problem.topics}>
                {props.topics.map((topic, index) => (
                  <MenuItemOption key={index} value={topic}>
                    {normalizeName(topic)}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          {problem.topics.length !== 0 ? (
            <HStack className={styles.topics}>
              {problem.topics.map((topic, index) => (
                <div className={styles.item} key={index}>
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
