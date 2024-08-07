import { httpRequest } from '~/utils/httpRequest';

export const signUp = (user) => {
  return httpRequest.post('/api/register', user).then((response) => response.data);
};

export const loginUser = (loginDetail) => {
  return httpRequest.post('/api/login', loginDetail).then((response) => response.data);
};

export const getUser = (userId) => {
  return httpRequest.get(`/api/users/${userId}`).then((response) => response.data);
};

export const getUsersByNameExcludingCurrentUser = (fullName, curUserId, page = 1, size = 10) => {
  return httpRequest.get(`/users/get-users-by-name-excluding-cur-user
              ?fullName=${fullName}&curUserId=${curUserId}&page=${size}&size=${size}`)
    .then((resp) => resp.data);
};
