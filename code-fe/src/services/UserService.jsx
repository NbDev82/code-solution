import axios from 'axios';
export const BASE_URL = 'http://localhost:8000/api/';

const customAxios = axios.create({
  baseURL: BASE_URL,
});
export const signUp = (user) => {
  return customAxios.post('/register', user).then((response) => response.data);
  debugger;
};

export const loginUser = (loginDetail) => {
  return customAxios.post('/login', loginDetail).then((response) => response.data);
};

export const getUser = (userId) => {
  return customAxios.get(`/users/${userId}`).then((resp) => resp.data);
};
