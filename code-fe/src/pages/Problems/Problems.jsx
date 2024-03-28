import { useState, useEffect, useCallback } from 'react';
import queryString from 'query-string';
import { Skeleton } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const [filters, setFilters] = useState({});
  const [statisticsDatasets, setStatisticsDatasets] = useState(() => {
    // const response = await getStatisticsDatasets()
    return STATISTICSDATASETS_SAMPLE;
  });
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProblemsList() {
      setLoading(true);
      try {
        console.log('fetching.......', filters);
        const paramsString = queryString.stringify(filters);
        navigate(`${location.pathname}?${paramsString}`);
        // const response = await getProblems(paramsString)
        // console.log(response)
        setProblems(PROBLEMS_SAMPLE.slice(0, 20));
      } catch (error) {}
      setLoading(false);
    }
    fetchProblemsList();
  }, [filters]);

  const handleFilterTopics = useCallback((value) => {
    console.log('handleFilterTopics: ', value);
    setFilters({ topic: topics[value].title });
  }, []);

  const handleFilterStatus = useCallback((value) => {
    console.log('handleFilterStatus: ', value);
    setFilters({ status: value });
  }, []);

  const handleFilterDifficulty = useCallback((value) => {
    console.log('handleFilterDifficulty: ', value);
    setFilters({ difficulty: value });
  }, []);

  const handlePickOnProblem = useCallback((value) => {
    console.log('handlePickOnProblem: ', value);
    setFilters({ pickone: true });
  }, []);

  const handleSearchSubmit = useCallback((value) => {
    console.log('handleSearchSubmit: ', value);
    setFilters({ searchTerm: value });
  }, []);

  const handleSelectProblem = useCallback((problem) => {
    console.log('handleSelectProblem: ', problem);
    setFilters({ problemID: problem.id });
  }, []);

  const handlePageChange = useCallback(({ selected: page }) => {
    console.log('handlePageChange: ', page + 1);
    setFilters({ currentPage: page + 1 });
  }, []);

  return (
    <div className="problems">
      <Navbar></Navbar>
      <section className="problems__container">
        <div className="problems__container--col--60">
          <Topicbar topics={topics} onFilterTopics={handleFilterTopics} />
          <div className="problems__container--layout">
            <ProblemsToolbar
              onPickOnProblem={handlePickOnProblem}
              onSearchSubmit={handleSearchSubmit}
              onFilterStatus={handleFilterStatus}
              onFilterDifficulty={handleFilterDifficulty}
            ></ProblemsToolbar>
            <Skeleton minHeight={'600px'} width={'100%'} borderRadius={'10px'} isLoaded={!loading}>
              <TableProblems problems={problems} onSelectProblem={handleSelectProblem} />
            </Skeleton>

            <Pagination
              totalRows={22}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        <div className="problems__container--col--40">
          <CalendarBasic></CalendarBasic>

          <DoughnutChart
            title="Total number of problems solved"
            labels={['Easy', 'Normal', 'Hard']}
            backgroundColor={['#6fd75c', '#f79d14', '#fe4a49']}
            borderColor={['#6fd75c', '#f79d14', '#fe4a49']}
            dataValues={[statisticsDatasets.totalEasy, statisticsDatasets.totalNormal, statisticsDatasets.totalHard]}
          ></DoughnutChart>

          <BarChart
            title="Total number of problems solved this week"
            labels={WEEKS}
            backgroundColor={['#6fd75c', '#f79d14', '#fe4a49']}
            borderColor={['#6fd75c', '#f79d14', '#fe4a49']}
            dataValues={[
              { dataLabel: 'Easy', dataValues: statisticsDatasets.Easy },
              { dataLabel: 'Normal', dataValues: statisticsDatasets.Normal },
              { dataLabel: 'Hard', dataValues: statisticsDatasets.Hard },
            ]}
          ></BarChart>

          <LineChart
            title="Total number of problems solved this week"
            labels={WEEKS}
            backgroundColor={['#6fd75c', '#f79d14', '#fe4a49']}
            borderColor={['#6fd75c', '#f79d14', '#fe4a49']}
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
