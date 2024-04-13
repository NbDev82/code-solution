import httpRequest from '~/utils/httpRequest';
const getProblems = async (request) => {
  return await httpRequest.post(`/api/problems`,request);
};

const getAllTopics = async () => {
  return await httpRequest.get(`/api/topics`);
};

const getStatisticsDatasets = async () => {
  return await httpRequest.get(`/api/statistics`);
};
export { getProblems, getAllTopics, getStatisticsDatasets };