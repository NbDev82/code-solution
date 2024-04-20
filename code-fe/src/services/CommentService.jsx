import axios from 'axios';
const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}/api/comment`;

const getComments = async (problemId) => {
  return await axios.get(`${BASE_URL}/get-comments/${problemId}`);
};

const replyComment = async (request) => {
  return await axios.post(`${BASE_URL}/reply-comment`, request);
};

const addComment = async (request) => {
  return await axios.post(`${BASE_URL}/add-comment`, request);
};

const updateComment = async (request) => {
  return await axios.put(`${BASE_URL}/update-comment`, request);
};

const deleteComment = async (paramString) => {
  console.log(`${BASE_URL}/delete-comment`);
  console.log(paramString);
  return await axios.delete(`${BASE_URL}/delete-comment?${paramString}`);
};

export { getComments, replyComment, addComment, updateComment, deleteComment };
