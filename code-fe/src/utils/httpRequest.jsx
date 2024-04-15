import axios from 'axios';
import { getToken } from '../auth';
import { ORIGINAL_API_URL } from '~/utils/Const';

export const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};
httpRequest.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default httpRequest;
