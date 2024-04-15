import { httpRequest } from '~/utils/httpRequest';

export const signUp = (user) => {
  return httpRequest.post('/api/register', user).then((response) => response.data);
  debugger;
};

export const loginUser = (loginDetail) => {
  return httpRequest.post('/api/login', loginDetail).then((response) => response.data);
};

export const getUser = (userId) => {
  return httpRequest.get(`/api/users/${userId}`).then((resp) => resp.data);
};
