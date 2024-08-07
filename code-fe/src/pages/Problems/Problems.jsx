import { useState, useEffect, useCallback } from 'react';
import queryString from 'query-string';
import { Skeleton } from '@chakra-ui/react';
import styles from './Problems.module.scss';
import Navbar from '~/components/Navbars/MainNavbar';
import Footer from '~/components/Footer';
import Topicbar from '~/components/Toolbars/Topicbar';
import TableProblems from '~/components/Problems/TableProblems';
import { FILTER_DEFAULT, WEEKS } from '~/utils/Const';
import { getProblems, getAllTopics, getStatisticsDatasets, pickOneProblem } from '~/services/ProblemService';
import ProblemsToolbar from '~/components/Toolbars/ProblemsToolbar';
import BarChart from '~/components/Charts/BarChart';
import DoughnutChart from '~/components/Charts/DoughnutChart';
import LineChart from '~/components/Charts/LineChart';
import Pagination from '~/components/Pagination';
import { getCurrentUserDetail } from '~/auth';
import FilterStatus from '~/components/Toolbars/FilterStatus';
import { useNavigate } from 'react-router-dom';
function Problems(props) {
  const [user, setUser] = useState(getCurrentUserDetail());
  const [topics, setTopics] = useState([]);
  const [problems, setProblems] = useState([]);
  const [filters, setFilters] = useState(FILTER_DEFAULT);
  const [statisticsDatasets, setStatisticsDatasets] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalElement, setTotalElement] = useState(0);
  const navigate = useNavigate();
  const fetchProblemsList = async () => {
    try {
      const response = await getProblems(filters);
      setProblems(response.data.problemDTOs);
      setTotalElement(response.data.totalElement);
    } catch (error) {
      console.log('Fetch Problems Error', error);
    }
    setLoading(false);
  };

  const fetchStatisticDatasets = async () => {
    try {
      const response = await getStatisticsDatasets(queryString.stringify({ userId: user.id }));
      setStatisticsDatasets(response.data);
    } catch (error) {
      console.log('Fetch Statistic Datasets Error', error);
    }
  };

  const fetchTopics = async () => {
    try {
      const response = await getAllTopics();
      setTopics(response.data);
    } catch (error) {
      console.log('Fetch Topics Error', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTopics();
    fetchProblemsList();
    fetchStatisticDatasets();
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProblemsList();
  }, [filters]);

  const handleFilterTopics = useCallback((value) => {
    setFilters((prev) => ({ ...prev, topic: value }));
  }, []);

  const handleFilterStatus = useCallback((value) => {
    setFilters((prev) => ({ ...prev, status: value }));
  }, []);

  const handleFilterDifficulty = useCallback((value) => {
    setFilters((prev) => ({ ...prev, difficulty: value }));
  }, []);

  const handlePickOneProblem = async (value) => {
    try {
      const response = await pickOneProblem();
      const data = response.data;
      console.log('Server response:', response.data);
      navigate(`/problems/${data.name.toLowerCase().replace(' ', '-')}`, {
        state: { problemId: data.id, problems: problems },
      });
      window.location.reload();
    } catch (error) {
      console.error('Error pick one code:', error.response.data.message);
    }
  };

  const handleSearchSubmit = useCallback((value) => {
    setFilters((prev) => ({ ...prev, searchTerm: value }));
  }, []);

  const handlePageChange = useCallback(({ selected: page }) => {
    setFilters((prev) => ({ ...prev, pageNumber: page }));
  }, []);

  const handleRemoveStatusFilter = (status) => {
    let removedStatus = {};
    const entry = Object.entries(filters).find(([key, value]) => value === status);
    if (entry && entry[0] === 'search') {
      removedStatus = { search: '' };
    } else {
      removedStatus[entry[0]] = 'ALL';
    }
    setFilters((prev) => ({ ...prev, ...removedStatus }));
  };

  return (
    <div className="problems">
      <Navbar></Navbar>
      <section className={styles.problems__container}>
        <div className={styles.problems__container_col_60}>
          <Topicbar topics={topics} onFilterTopics={handleFilterTopics} />
          <div className={styles.problems__container_layout}>
            <ProblemsToolbar
              filters={filters}
              onPickOnProblem={handlePickOneProblem}
              onSearchSubmit={handleSearchSubmit}
              onFilterStatus={handleFilterStatus}
              onFilterDifficulty={handleFilterDifficulty}
            ></ProblemsToolbar>
            <FilterStatus filters={filters} onRemoveFilter={handleRemoveStatusFilter}></FilterStatus>
            <Skeleton minHeight={'600px'} width={'100%'} borderRadius={'10px'} isLoaded={!loading}>
              <TableProblems problems={problems} />
            </Skeleton>

            <Pagination totalRows={totalElement} onPageChange={handlePageChange} />
          </div>
        </div>
        <div className={styles.problems__container_col_40}>
          {/* <CalendarBasic></CalendarBasic> */}
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
              { dataLabel: 'Easy', dataValues: statisticsDatasets.easy },
              { dataLabel: 'Normal', dataValues: statisticsDatasets.normal },
              { dataLabel: 'Hard', dataValues: statisticsDatasets.hard },
            ]}
          ></BarChart>

          <LineChart
            title="Total number of problems solved this week"
            labels={WEEKS}
            backgroundColor={['#6fd75c', '#f79d14', '#fe4a49']}
            borderColor={['#6fd75c', '#f79d14', '#fe4a49']}
            dataValues={[
              { dataLabel: 'Easy', dataValues: statisticsDatasets.easy },
              { dataLabel: 'Normal', dataValues: statisticsDatasets.normal },
              { dataLabel: 'Hard', dataValues: statisticsDatasets.hard },
            ]}
          ></LineChart>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}

export default Problems;
