import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

import './TableProblems.scss';
import Todo from '~/assets/images/Todo.svg';
import Solved from '~/assets/images/Solved.svg';
import Attempted from '~/assets/images/Attempted.svg';

const TableProblems = memo((props) => {
  const getColor = (difficulty) => {
    if (difficulty === 'Easy') return 'var(--green)';
    else if (difficulty === 'Normal') return 'var(--orange)';
    else return 'var(--red)';
  };
  const getStatus = (status) => {
    if (status === 'Todo') return Todo;
    else if (status === 'Solved') return Solved;
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
              key={problem.id}
              style={{ backgroundColor: index % 2 === 0 ? 'var(--gray-light)' : 'var(--white)' }}
              onClick={() => props.onSelectProblem(problem)}
            >
              <Td>
                <img src={getStatus(problem.status)} alt={problem.status}></img>
              </Td>

              <Td>{problem.name}</Td>
              <Td>{problem.acceptance}%</Td>
              <Td style={{ color: getColor(problem.difficulty) }}>{problem.difficulty}</Td>
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
