import httpRequest from '~/utils/httpRequest';
const BASE_URL = '/api/submit-code';

const getInputCode = async (paramsString) => {
  return await httpRequest.get(`${BASE_URL}/getInputCode?${paramsString}`);
};

const runCode = async (request) => {
  return await httpRequest.post(`${BASE_URL}/run`, request);
};

export { getInputCode, runCode };
