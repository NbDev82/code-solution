import axios from 'axios';
import { ORIGINAL_API_URL } from '~/utils/Const';
const CONV_API_URL = `${ORIGINAL_API_URL}/api/problems`;
const getProblems = async (paramsString) => {
  const requestURL = `${CONV_API_URL}/get-problems?${paramsString}`;
  return await axios.get(requestURL);
};

const getAllTopics = async () => {
  const requestURL = `${CONV_API_URL}/get-all-topics?all`;
  return await axios.get(requestURL);
};

const getStatisticsDatasets = async () => {
  const requestURL = `${CONV_API_URL}/get-statistics-datasets?values`;
  return await axios.get(requestURL);
};
export { getProblems, getAllTopics, getStatisticsDatasets };
