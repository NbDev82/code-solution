import { httpRequest } from '~/utils/httpRequest';

export const signUp = (user) => {
  return httpRequest.post('/api/register', user).then((response) => response.data);
  debugger;
};

export const loginUser = (loginDetail) => {
  debugger;
  return httpRequest.post('/api/login', loginDetail).then((response) => response.data);
};

export const getUser = (userId) => {
  return httpRequest.get(`/api/users/${userId}`).then((response) => response.data);
};

export const getUsersExcludingCurrentUser = (curUserId, page = 1, size = 10) => {
  return httpRequest.get(`/users/get-users-excluding-cur-user
              ?curUserId=${curUserId}&page=${size}&size=${size}`)
    .then((resp) => resp.data);
};

export const getUsersByNameExcludingCurrentUser = (fullName, curUserId, page = 1, size = 10) => {
  return httpRequest.get(`/users/get-users-by-name-excluding-cur-user
              ?fullName=${fullName}&curUserId=${curUserId}&page=${size}&size=${size}`)
    .then((resp) => resp.data);
};
