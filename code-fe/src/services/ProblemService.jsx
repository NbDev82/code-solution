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

export { getProblems, getAllTopics, getStatisticsDatasets, getProblem };
