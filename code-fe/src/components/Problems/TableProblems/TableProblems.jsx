import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import styles from './TableProblems.module.scss';
import Todo from '~/assets/images/Todo.svg';
import Solved from '~/assets/images/Solved.svg';
import Attempted from '~/assets/images/Attempted.svg';
import { WarningIcon } from '@chakra-ui/icons';
const TableProblems = memo((props) => {
  const navigate = useNavigate();

  const getDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'EASY':
        return <Td style={{ color: 'var(--green)' }}>Easy</Td>;
      case 'NORMAL':
        return <Td style={{ color: 'var(--orange)' }}>Normal</Td>;
      case 'HARD':
        return <Td style={{ color: 'var(--red)' }}>Hard</Td>;
      default:
        return (
          <Td style={{ color: '#FF0100' }}>
            <WarningIcon w={6} h={6} color="#FF0100"></WarningIcon> Not found!
          </Td>
        );
    }
  };
  const getStatus = (status) => {
    if (status === 'TODO') return Todo;
    else if (status === 'SOLVED') return Solved;
    else return Attempted;
  };

  const titleStyles = {
    fontSize: '12px',
    fontWeight: '700',
    fontFamily: 'var(--font-family)',
    color: 'var(--secondary-color)',
  };

  const handleSelectProblem = (problem) => {
    navigate(`/problems/${problem.title.toLowerCase().replace(' ', '-')}`, {
      state: { problemId: problem.id, problems: props.problems },
    });
  };
  return (
    <TableContainer className={styles.table__layout}>
      <Table variant="striped" colorScheme="whiteAlpha" size="lg">
        <Thead>
          <Tr>
            <Th style={titleStyles}>Status</Th>
            <Th style={titleStyles}>Title</Th>
            <Th style={titleStyles}>Acceptance</Th>
            <Th style={titleStyles}>Difficulty</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.problems.map((problem, index) => (
            <Tr
              cursor="pointer"
              key={index}
              style={{ backgroundColor: index % 2 === 0 ? 'var(--gray-light)' : 'var(--white)' }}
              onClick={() => handleSelectProblem(problem)}
              marginBottom="5px"
            >
              <Td>
                <img src={getStatus(problem.status)} alt={problem.status}></img>
              </Td>
              <Td>{problem.title}</Td>
              <Td>{problem.acceptanceRate}%</Td>
              {getDifficulty(problem.difficulty)}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
});

TableProblems.propTypes = {
  problems: PropTypes.array,
};

TableProblems.defaultProps = {
  problems: [],
};

export default TableProblems;
