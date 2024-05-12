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
  const requestURL = `${BASE_URL}/get-all-by-user-id?${paramsString}`;
  return await axios.get(requestURL);
};

const deleteProblem = async (request) => {
  const requestURL = `${BASE_URL}/problem/delete`;
  return await axios.post(requestURL, request);
};

const addProblem = async (request) => {
  const requestURL = `${BASE_URL}/problem/add`;
  return await axios.post(requestURL, request);
};

const updateProblem = async (request) => {
  const requestURL = `${BASE_URL}/problem/update`;
  return await axios.post(requestURL, request);
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
};
