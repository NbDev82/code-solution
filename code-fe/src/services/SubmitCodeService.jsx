import axios from 'axios';
import { ORIGINAL_API_URL } from '~/utils/Const';
const CONV_API_URL = `${ORIGINAL_API_URL}/api/submit-code`;

const getInputCode = async (paramsString) => {
  const requestURL = `${CONV_API_URL}/getInputCode?${paramsString}`;
  return await axios.get(requestURL);
};

const runCode = async (request) => {
  const requestURL = `${CONV_API_URL}/run`;
  return await axios.post(requestURL, request);
};

export { getInputCode, runCode };
