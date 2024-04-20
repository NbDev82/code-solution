import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

import './TableProblems.scss';
import Todo from '~/assets/images/Todo.svg';
import Solved from '~/assets/images/Solved.svg';
import Attempted from '~/assets/images/Attempted.svg';
import { WarningIcon } from '@chakra-ui/icons';
const TableProblems = memo((props) => {
  const getDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'EASY':
        return <Td style={{ color: 'var(--green)' }}>Easy</Td>;
      case 'NORMAL':
        return <Td style={{ color: 'var(--orange)' }}>Easy</Td>;
      case 'HARD':
        return <Td style={{ color: 'var(--red)' }}>Easy</Td>;
      default:
        <Td style={{ color: '#FF0100' }}>
          <WarningIcon w={8} h={8} color="var(--green)"></WarningIcon>Not found!
        </Td>;
        break;
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
  return (
    <TableContainer className="table__layout">
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
              onClick={() => props.onSelectProblem(problem)}
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
  onSelectProblem: PropTypes.func,
};
TableProblems.defaultProps = {
  problems: [],
};

export default TableProblems;
