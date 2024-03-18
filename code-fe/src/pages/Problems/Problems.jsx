import { useState, useEffect } from 'react';

import './Problems.scss';
import Navbar from '~/components/Navbars/MainNavbar';
import Footer from '~/components/Footer';
import Topicbar from '~/components/Toolbars/Topicbar';
import TableProblems from '~/components/Problems/TableProblems';
import { LIMIT_ROW_PROBLEMS_TABLE, PROBLEMS_SAMPLE, TOPICS_SAMPLE } from '~/Const';

function Problems(props) {
  const [topics, setTopics] = useState(TOPICS_SAMPLE);
  const [problems, setProblems] = useState(PROBLEMS_SAMPLE);
  const [problemsView, setProblemsView] = useState([]);
  useEffect(() => {
    setProblemsView((prev) => problems.slice(0, LIMIT_ROW_PROBLEMS_TABLE));
  }, []);

  const handleFillterProblem = async (id) => {
    let listProblemsView = problemsView;
    if (id === 'all') listProblemsView = problems.slice(0, LIMIT_ROW_PROBLEMS_TABLE);
    else
      listProblemsView = problems
        .filter((problem) => problem.topics.includes(topics[id].title))
        .slice(0, LIMIT_ROW_PROBLEMS_TABLE);
    setProblemsView((prev) => listProblemsView);
  };

  return (
    <div className="problems">
      <Navbar></Navbar>
      <section className="problems__container">
        <div className="problems__container--col--60">
          <Topicbar topics={topics} onFillterProblem={handleFillterProblem}></Topicbar>
          <TableProblems problems={problemsView}></TableProblems>
        </div>
        <div className="problems__container--col--40"></div>
      </section>
      <Footer></Footer>
    </div>
  );
}

export default Problems;
