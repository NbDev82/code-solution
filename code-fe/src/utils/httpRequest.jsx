import axios from 'axios';
import { getToken } from '../auth';
import { ORIGINAL_API_URL } from '~/utils/Const';

export const httpRequest = axios.create({
  baseURL: ORIGINAL_API_URL,
});

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};
export const privateHttpRequest = axios.create({
  baseURL: ORIGINAL_API_URL,
});
privateHttpRequest.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
export default { httpRequest, privateHttpRequest };
