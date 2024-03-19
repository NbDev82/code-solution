import { useState, useEffect, useCallback } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import './Problems.scss';
import Navbar from '~/components/Navbars/MainNavbar';
import Footer from '~/components/Footer';
import Topicbar from '~/components/Toolbars/Topicbar';
import TableProblems from '~/components/Problems/TableProblems';
import { LIMIT_ROW_PROBLEMS_TABLE, PROBLEMS_SAMPLE, TOPICS_SAMPLE } from '~/utils/Const';
import ProblemService from '~/services/ProblemService';
import ProblemsToolbar from '~/components/Toolbars/ProblemsToolbar';
import Button from '~/components/Buttons/Button';

function Problems(props) {
  const [topics, setTopics] = useState(TOPICS_SAMPLE);
  const [problems, setProblems] = useState(PROBLEMS_SAMPLE);
  const [problemsView, setProblemsView] = useState([]);
  useEffect(() => {
    setProblemsView(() => problems.slice(0, LIMIT_ROW_PROBLEMS_TABLE));
  }, []);

  const handleFilterTopics = useCallback((value) => {
    let listProblemsView = problemsView;
    if (value === 'all') listProblemsView = problems.slice(0, LIMIT_ROW_PROBLEMS_TABLE);
    else
      listProblemsView = problems
        .filter((problem) => problem.topics.includes(topics[value].title))
        .slice(0, LIMIT_ROW_PROBLEMS_TABLE);
    setProblemsView(listProblemsView);
  }, []);

  const handleFilterStatus = useCallback((value) => {
    console.log(value);
  }, []);
  const handleFilterDifficulty = useCallback((value) => {
    console.log(value);
  }, []);

  const handlePickOnProblem = useCallback((value) => {
    if (value === 'pickone') {
      console.log(problems[Math.floor(Math.random() * problems.length)]);
    }
  }, []);

  const handleSearchSubmit = useCallback((value) => {
    console.log(value);
  }, []);

  const handleSelectProblem = useCallback((problem) => {
    console.log(problem);
  }, []);

  const handleChangeProblemsView = async (id) => {
    console.log(id);
  };

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
            <TableProblems problems={problemsView} onSelectProblem={handleSelectProblem}></TableProblems>
            <div className="table__control">
              <Button icon id="back" onClick={handleChangeProblemsView}>
                <ArrowBackIosIcon sx={{ fontSize: 16 }} />
              </Button>
              <Button icon id="next" onClick={handleChangeProblemsView}>
                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </Button>
            </div>
          </div>
        </div>
        <div className="problems__container--col--40"></div>
      </section>
      <Footer></Footer>
    </div>
  );
}

export default Problems;
