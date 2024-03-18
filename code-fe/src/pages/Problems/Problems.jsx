import { useState, useEffect } from 'react';

import './Problems.scss';
import Navbar from '~/components/Navbars/MainNavbar';
import Footer from '~/components/Footer';
import Topicbar from '~/components/Toolbars/Topicbar';
import TableProblems from '~/components/Problems/TableProblems';
import { limitTableProblems } from '~/Const';

function Problems(props) {
  const [topics, setTopics] = useState([
    { id: 0, title: 'String', quantity: 22 },
    { id: 1, title: 'Array', quantity: 56 },
    { id: 2, title: 'Sorting', quantity: 18 },
    { id: 3, title: 'Math', quantity: 9 },
    { id: 4, title: 'Counting', quantity: 27 },
    { id: 5, title: 'Searching', quantity: 9 },
    { id: 6, title: 'Recursion', quantity: 26 },
    { id: 7, title: 'Regex', quantity: 11 },
    { id: 8, title: 'Random', quantity: 21 },
    { id: 9, title: 'Stack', quantity: 18 },
    { id: 10, title: 'Geometry', quantity: 6 },
    { id: 11, title: 'Data Structures', quantity: 2 },
    { id: 12, title: 'Looping', quantity: 7 },
  ]);
  const [problems, setProblems] = useState([
    {
      id: 0,
      title: 'Two Sum',
      status: 'Todo',
      acceptance: 38.27,
      difficulty: 'Easy',
      topics: ['Array', 'Math', 'Counting'],
    },
    {
      id: 1,
      title: 'Sort Banana',
      status: 'Solved',
      acceptance: 34.29,
      difficulty: 'Normal',
      topics: ['Sorting', 'Counting'],
    },
    {
      id: 2,
      title: 'Search Pig Film',
      status: 'Attempted',
      acceptance: 42.57,
      difficulty: 'Hard',
      topics: ['Searching'],
    },
    {
      id: 3,
      title: 'Palindrome Checker',
      status: 'Todo',
      acceptance: 27.24,
      difficulty: 'Easy',
      topics: ['String'],
    },
    {
      id: 4,
      title: 'FizzBuzz',
      status: 'Todo',
      acceptance: 35.67,
      difficulty: 'Easy',
      topics: ['Math'],
    },
    {
      id: 5,
      title: 'Reverse Array',
      status: 'Todo',
      acceptance: 17.82,
      difficulty: 'Normal',
      topics: ['Array'],
    },
    {
      id: 6,
      title: 'Factorial Calculator',
      status: 'Attempted',
      acceptance: 14.28,
      difficulty: 'Medium',
      topics: ['Math', 'Recursion'],
    },
    {
      id: 7,
      title: 'Find Prime Numbers',
      status: 'Todo',
      acceptance: 85.36,
      difficulty: 'Hard',
      topics: ['Math', 'Searching'],
    },
    {
      id: 8,
      title: 'Validate Email Addresses',
      status: 'Solved',
      acceptance: 11.27,
      difficulty: 'Medium',
      topics: ['String', 'Regex'],
    },
    {
      id: 9,
      title: 'Calculate Fibonacci Sequence',
      status: 'Solved',
      acceptance: 35.25,
      difficulty: 'Hard',
      topics: ['Math', 'Recursion'],
    },
    {
      id: 10,
      title: 'Implement Binary Search',
      status: 'Attempted',
      acceptance: 28.92,
      difficulty: 'Normal',
      topics: ['Array', 'Searching'],
    },
    {
      id: 11,
      title: 'Convert Roman Numerals to Integer',
      status: 'Todo',
      acceptance: 15.36,
      difficulty: 'Medium',
      topics: ['String', 'Math'],
    },
    {
      id: 12,
      title: 'Generate Random Passwords',
      status: 'Todo',
      acceptance: 35.01,
      difficulty: 'Easy',
      topics: ['String', 'Random'],
    },
    {
      id: 13,
      title: 'Check Anagrams',
      status: 'Todo',
      acceptance: 25.78,
      difficulty: 'Medium',
      topics: ['String'],
    },
    {
      id: 14,
      title: 'Calculate Area of Shapes',
      status: 'Todo',
      acceptance: 12.35,
      difficulty: 'Normal',
      topics: ['Math', 'Geometry'],
    },
    {
      id: 15,
      title: 'Implement Stack Data Structure',
      status: 'Todo',
      acceptance: 24.37,
      difficulty: 'Hard',
      topics: ['Data Structures'],
    },
    {
      id: 16,
      title: 'Find Longest Common Prefix',
      status: 'Todo',
      acceptance: 22.45,
      difficulty: 'Medium',
      topics: ['String'],
    },
    {
      id: 17,
      title: 'Calculate Factorial using Iteration',
      status: 'Todo',
      acceptance: 12.24,
      difficulty: 'Easy',
      topics: ['Math', 'Looping'],
    },
    {
      id: 18,
      title: 'Implement Queue Data Structure',
      status: 'Todo',
      acceptance: 35.36,
      difficulty: 'Normal',
      topics: ['Data Structures'],
    },
    {
      id: 19,
      title: 'Check Balanced Parentheses',
      status: 'Todo',
      acceptance: 37.4,
      difficulty: 'Medium',
      topics: ['String', 'Stack'],
    },
    {
      id: 20,
      title: 'Find Missing Number in Array',
      status: 'Todo',
      acceptance: 24.25,
      difficulty: 'Hard',
      topics: ['Array', 'Math'],
    },
    {
      id: 21,
      title: 'Count Cat In My House',
      status: 'Todo',
      acceptance: 14.23,
      difficulty: 'Hard',
      topics: ['Array', 'Couting'],
    },
    {
      id: 22,
      title: 'Find Cat in Bushes',
      status: 'Todo',
      acceptance: 9.25,
      difficulty: 'Hard',
      topics: ['Array', 'Searching'],
    },
  ]);
  const [problemsView, setProblemsView] = useState([]);
  useEffect(() => {
    setProblemsView((prev) => problems.slice(0, limitTableProblems));
  }, []);

  const handleFillterProblem = async (id) => {
    let listProblemsView = problemsView;
    if (id === 'all') listProblemsView = problems.slice(0, limitTableProblems);
    else
      listProblemsView = problems
        .filter((problem) => problem.topics.includes(topics[id].title))
        .slice(0, limitTableProblems);
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
