import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';

import './Problems.scss';
import Navbar from '~/components/Navbars/MainNavbar';
import Footer from '~/components/Footer';
import Topicbar from '~/components/Toolbars/Topicbar';

function Problems(props) {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    setTopics((prev) => [
      { title: 'String', quantity: 22 },
      { title: 'Array', quantity: 56 },
      { title: 'Sorting', quantity: 18 },
      { title: 'Math', quantity: 9 },
      { title: 'Counting', quantity: 27 },
      { title: 'Searching', quantity: 31 },
    ]);
  }, []);

  const handleFillterProblem = (id) => {
    console.log(id);
  };

  return (
    <div className="problems">
      <Navbar></Navbar>
      <section className="problems__container">
        <div className="problems__container--col">
          <Topicbar topics={topics} onFillterProblem={handleFillterProblem}></Topicbar>
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Status</Th>
                  <Th>Title</Th>
                  <Th isNumeric>Acceptance</Th>
                  <Th>Difficulty</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>xxx</Td>
                  <Td>Two Sum</Td>
                  <Td isNumeric>25.4%</Td>
                  <td>Easy</td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>
        <div className="problems__container--col"></div>
      </section>
      <Footer></Footer>
    </div>
  );
}

export default Problems;
