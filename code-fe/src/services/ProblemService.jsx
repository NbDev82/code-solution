import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}/api`;
const getProblems = async (request) => {
  const requestURL = `${BASE_URL}/search/problems`;
  return await axios.post(requestURL, request);
};

const getAllTopics = async () => {
  const requestURL = `${BASE_URL}/topics`;
  return await axios.get(requestURL);
};

const getStatisticsDatasets = async (paramsString) => {
  const requestURL = `${BASE_URL}/statistic?${paramsString}`;
  return await axios.get(requestURL);
};

const getProblem = async (paramString) => {
  return await axios.get(`${BASE_URL}/problems/findById?${paramString}`);
};

const getAllProblemByUserId = async (paramsString) => {
  const requestURL = `${BASE_URL}/problems/get-profile-problems?${paramsString}`;
  console.log(requestURL);
  return await axios.get(requestURL);
};

const deleteProblem = async (paramsString) => {
  const requestURL = `${BASE_URL}/problems/delete?${paramsString}`;
  console.log(requestURL);
  return await axios.delete(requestURL);
};

const addProblem = async (request) => {
  const requestURL = `${BASE_URL}/problems/add`;
  return await axios.post(requestURL, request);
};

const updateProblem = async (request) => {
  const requestURL = `${BASE_URL}/problems/update`;
  return await axios.post(requestURL, request);
};

const pickOneProblem = async () => {
  const requestURL = `${BASE_URL}/problems/pickOne`;
  return await axios.get(requestURL);
};

export {
  getProblems,
  getAllTopics,
  getStatisticsDatasets,
  getAllProblemByUserId,
  deleteProblem,
  addProblem,
  updateProblem,
  getProblem,
  pickOneProblem,
};
