import httpRequest from '~/utils/httpRequest';
const getProblems = async (paramsString) => {
  return await httpRequest.get(`/api/problems/get-problems?${paramsString}`);
};

const getAllTopics = async () => {
  return await httpRequest.get(`/get-all-topics?all`);
};

const getStatisticsDatasets = async () => {
  return await httpRequest.get(`/get-statistics-datasets?values`);
};

const getProblem = async (paramsString)=>{
  const requestURL = `${CONV_API_URL}/findById?${paramsString}`;
  return await axios.get(requestURL);
}
export { getProblems, getAllTopics, getStatisticsDatasets ,getProblem};
