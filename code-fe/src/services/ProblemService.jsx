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
export { getProblems, getAllTopics, getStatisticsDatasets };
