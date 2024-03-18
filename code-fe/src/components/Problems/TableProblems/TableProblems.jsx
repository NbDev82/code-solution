import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import './TableProblems.scss';

const TableProblems = memo((props) => {
  return (
    <TableContainer className="table__layout">
      <Table variant="striped" colorScheme="gray" size="lg">
        <Thead>
          <Tr>
            <Th>Status</Th>
            <Th>Title</Th>
            <Th>Acceptance</Th>
            <Th>Difficulty</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.problems.map((problem) => (
            <Tr key={problem.id}>
              <Td>{problem.status}</Td>
              <Td>{problem.title}</Td>
              <Td>{problem.acceptance}%</Td>
              <Td>{problem.difficulty}</Td>
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

export default TableProblems;
