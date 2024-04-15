import httpRequest from '~/utils/httpRequest';
const BASE_URL = '/api';
const getComments = async (paramsString) => {
  return await httpRequest.get(`${BASE_URL}/get-comments?${paramsString}`);
};
const replyComment = async (request) => {
  return await httpRequest.post(`${BASE_URL}/reply-comment`, request);
};
const addComment = async (request) => {
  return await httpRequest.post(`${BASE_URL}/add-comment`, request);
};
const updateComment = async (request) => {
  return await httpRequest.put(`${BASE_URL}/update-comment`, request);
};
const deleteComment = async (request) => {
  return await httpRequest.delete(`${BASE_URL}/delete-comment`, request);
};
export { getComments, replyComment, addComment, updateComment, deleteComment };
