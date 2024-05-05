import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  HStack,
  Button,
  Tooltip,
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import styles from './MyTableProblems.module.scss';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { WarningIcon, ViewIcon } from '@chakra-ui/icons';
import { ACTION } from '~/utils/Const';
const MyTableProblems = memo((props) => {
  const navigate = useNavigate();

  const getDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'EASY':
        return <Td style={{ color: 'var(--green)' }}>Easy</Td>;
      case 'NORMAL':
        return <Td style={{ color: 'var(--orange)' }}>Easy</Td>;
      case 'HARD':
        return <Td style={{ color: 'var(--red)' }}>Easy</Td>;
      default:
        return (
          <Td style={{ color: '#FF0100' }}>
            <WarningIcon w={6} h={6} color="#FF0100"></WarningIcon> Not found!
          </Td>
        );
    }
  };

  const titleStyles = {
    fontSize: '12px',
    fontWeight: '700',
    fontFamily: 'var(--font-family)',
    color: 'var(--secondary-color)',
  };

  function shortenString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }

  const handleSelectProblem = (problem) => {
    navigate(`/problems/${problem.title.toLowerCase().replace(' ', '-')}`, {
      state: { problemId: problem.id },
    });
  };

  const handleDeleteProblem = (problem) => {};
  const handleEditProblem = (problem) => {
    navigate(`/problem-details/edit`, {
      state: { problem: problem, action: ACTION.UPDATE },
    });
  };
  return (
    <TableContainer className={styles.table__layout}>
      <Table variant="striped" colorScheme="whiteAlpha" size="lg">
        <Thead>
          <Tr>
            <Th style={titleStyles}>Title</Th>
            <Th style={titleStyles}>Description</Th>
            <Th style={titleStyles}>Point</Th>
            <Th style={titleStyles}>Acceptance</Th>
            <Th style={titleStyles}>Difficulty</Th>
            <Th style={titleStyles}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.problems.map((problem, index) => (
            <Tr
              cursor="pointer"
              key={index}
              style={{ backgroundColor: index % 2 === 0 ? 'var(--gray-light)' : 'var(--white)' }}
              marginBottom="5px"
            >
              <Td className={styles.text} onClick={() => handleSelectProblem(problem)}>
                {problem.title}
              </Td>
              <Td>
                <Popover>
                  <PopoverTrigger>
                    <span className={styles.text}>{shortenString(problem.description, 50)}</span>
                  </PopoverTrigger>
                  <PopoverContent
                    style={{ width: '500px', background: 'var(--gray-dark)', borderRadius: 'var(--radius-size-small)' }}
                  >
                    <PopoverArrow bg="var(--gray-dark)" />
                    <PopoverBody>
                      <Box className={styles.des__content}>{problem.description}</Box>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Td>
              <Td>
                <Tooltip
                  hasArrow
                  label="Point"
                  bg="var(--gray-dark)"
                  color="var(--white)"
                  placement="auto"
                  borderRadius="var(--radius-size-smallsmall)"
                  padding="8px"
                >
                  <span>{problem.point}</span>
                </Tooltip>
              </Td>
              <Td>
                <Tooltip
                  hasArrow
                  label="Acceptance Rate"
                  bg="var(--gray-dark)"
                  color="var(--white)"
                  placement="auto"
                  borderRadius="var(--radius-size-smallsmall)"
                  padding="8px"
                >
                  <span>{problem.acceptanceRate}%</span>
                </Tooltip>
              </Td>
              {getDifficulty(problem.difficulty)}
              <Td>
                <HStack spacing={8}>
                  <Button
                    color="var(--secondary-color)"
                    _hover={{ color: 'var(--orange)' }}
                    bg="transparent"
                    onClick={() => handleEditProblem(problem)}
                    leftIcon={<EditOutlinedIcon></EditOutlinedIcon>}
                  >
                    Edit
                  </Button>
                  <Button
                    color="var(--secondary-color)"
                    bg="transparent"
                    _hover={{ color: 'var(--red)' }}
                    onClick={() => handleDeleteProblem(problem)}
                    leftIcon={<DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>}
                  >
                    Delete
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
});

MyTableProblems.propTypes = {
  problems: PropTypes.array,
};

MyTableProblems.defaultProps = {
  problems: [],
};

export default MyTableProblems;
