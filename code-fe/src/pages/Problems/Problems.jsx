import { useState, useEffect, useCallback } from 'react';
import queryString from 'query-string';

import './Problems.scss';
import Navbar from '~/components/Navbars/MainNavbar';
import Footer from '~/components/Footer';
import Topicbar from '~/components/Toolbars/Topicbar';
import TableProblems from '~/components/Problems/TableProblems';
import {
  LIMIT_ROW_PROBLEMS_TABLE,
  PROBLEMS_SAMPLE,
  TOPICS_SAMPLE,
  WEEKS,
  STATISTICSDATASETS_SAMPLE,
} from '~/utils/Const';
import { getProblems, getAllTopics, getStatisticsDatasets } from '~/services/ProblemService';
import ProblemsToolbar from '~/components/Toolbars/ProblemsToolbar';
import BarChart from '~/components/Charts/BarChart';
import DoughnutChart from '~/components/Charts/DoughnutChart';
import LineChart from '~/components/Charts/LineChart';
import Pagination from '~/components/Pagination';
import CalendarBasic from '~/components/Calendar';
function Problems(props) {
  const [topics, setTopics] = useState(() => {
    // const response = await getAllTopics()
    return TOPICS_SAMPLE;
  });
  const [problems, setProblems] = useState([]);
  const [filters, setFilters] = useState({
    limit: LIMIT_ROW_PROBLEMS_TABLE,
    currentPage: 1,
    totalRows: 30,
    status: 'all',
    difficulty: 'all',
    topic: 'all',
    searchTerm: '',
  });
  const [statisticsDatasets, setStatisticsDatasets] = useState(() => {
    // const response = await getStatisticsDatasets()
    return STATISTICSDATASETS_SAMPLE;
  });

  useEffect(() => {
    async function fetchProblemsList() {
      try {
        const paramsString = queryString.stringify(filters);
        console.log(paramsString);
        // const response = await getProblems(paramsString)
        // console.log(response)
        setProblems(PROBLEMS_SAMPLE.slice(0, 20));
      } catch (error) {}
    }
    fetchProblemsList();
  }, [filters]);

  const handleFilterTopics = useCallback((value) => {
    setFilters((prev) => ({ ...prev, topic: topics[value].title }));
  }, []);

  const handleFilterStatus = useCallback((value) => {
    setFilters((prev) => ({ ...prev, status: value }));
  }, []);

  const handleFilterDifficulty = useCallback((value) => {
    setFilters((prev) => ({ ...prev, difficulty: value }));
  }, []);

  const handlePickOnProblem = useCallback((value) => {
    if (value === 'pickone') {
      console.log(problems[Math.floor(Math.random() * problems.length)]);
    }
  }, []);

  const handleSearchSubmit = useCallback((value) => {
    setFilters((prev) => ({ ...prev, searchTerm: value }));
  }, []);

  const handleSelectProblem = useCallback((problem) => {
    console.log(problem);
  }, []);

  const handlePageChange = useCallback(({ selected: page }) => {
    setFilters((prev) => ({ ...prev, currentPage: page+1 }));
  }, []);

  return (
    <div className="problems">
      <Navbar></Navbar>
      <section className="problems__container">
        <div className="problems__container--col--60">
          <Topicbar topics={topics} onFilterTopics={handleFilterTopics}></Topicbar>
          <div className="problems__container--layout">
            <ProblemsToolbar
              onPickOnProblem={handlePickOnProblem}
              onSearchSubmit={handleSearchSubmit}
              onFilterStatus={handleFilterStatus}
              onFilterDifficulty={handleFilterDifficulty}
            ></ProblemsToolbar>
            <TableProblems problems={problems} onSelectProblem={handleSelectProblem}></TableProblems>
            <Pagination
              limit={filters.limit}
              totalRows={filters.totalRows}
              currentPage={filters.currentPage}
              onPageChange={handlePageChange}
            ></Pagination>
          </div>
        </div>
        <div className="problems__container--col--40">
          <CalendarBasic></CalendarBasic>
          <DoughnutChart
            title="Total number of problems solved"
            labels={['Easy', 'Normal', 'Hard']}
            dataValues={[statisticsDatasets.totalEasy, statisticsDatasets.totalNormal, statisticsDatasets.totalHard]}
          ></DoughnutChart>
          <BarChart
            title="Total number of problems solved this week"
            labels={WEEKS}
            dataValues={[
              { dataLabel: 'Easy', dataValues: statisticsDatasets.Easy },
              { dataLabel: 'Normal', dataValues: statisticsDatasets.Normal },
              { dataLabel: 'Hard', dataValues: statisticsDatasets.Hard },
            ]}
          ></BarChart>
          <LineChart
            title="Total number of problems solved this week"
            labels={WEEKS}
            dataValues={[
              { dataLabel: 'Easy', dataValues: statisticsDatasets.Easy },
              { dataLabel: 'Normal', dataValues: statisticsDatasets.Normal },
              { dataLabel: 'Hard', dataValues: statisticsDatasets.Hard },
            ]}
          ></LineChart>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}

export default Problems;
