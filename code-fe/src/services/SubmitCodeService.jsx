import axios from 'axios';
const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}/api/submit-code`

const getInputCode = async (paramsString) => {
  return await axios.get(`${BASE_URL}/getInputCode?${paramsString}`);
};

const runCode = async (request) => {
  return await axios.post(`${BASE_URL}/run`, request);
};

export { getInputCode, runCode };