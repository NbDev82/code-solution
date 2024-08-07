import { httpRequest } from '~/utils/httpRequest';
import { privateHttpRequest } from '~/utils/httpRequest';
export const createPost = (postData) => {
  return privateHttpRequest
    .post(`/api/user/${postData.userId}/category/${postData.categoryId}/posts`, postData)
    .then((response) => response.data);
};

export const loadAllPosts = (pageNumber, pageSize) => {
  return httpRequest
    .get(`/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`)
    .then((response) => response.data);
};

export const loadPost = (postId) => {
  return httpRequest.get('/api/posts/' + postId).then((response) => response.data);
};

export const loadComment = (commentId) => {
  return httpRequest.get('/api/post/comment/' + commentId).then((response) => response.data);
};
export const loadCommentByDiscuss = (postId) => {
  return httpRequest.get('/api/posts/comments/' + postId).then((response) => response.data);
};
export const loadCommentByParent = (commentParentId) => {
  return httpRequest.get('/api/post/comments/' + commentParentId).then((response) => response.data);
};

export const createComment = (comment, postId, userId) => {
  return privateHttpRequest.post(`/api/post/${postId}/user/${userId}/comments`, comment);
};

export const uploadPostImage = (image, postId) => {
  let formData = new FormData();
  formData.append('image', image);
  return privateHttpRequest
    .post(`/api/post/image/upload/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data);
};

export function loadPostCategoryWise(categoryId) {
  return privateHttpRequest.get(`/api/category/${categoryId}/posts`).then((response) => response.data);
}

export const loadPostUserWise = (userId) => {
  return privateHttpRequest.get(`/api/user/${userId}/posts`).then((response) => response.data);
};

export function deletePostService(postId) {
  return privateHttpRequest.delete(`/api/posts/delete/${postId}`).then((response) => response.data);
}
export function searchDiscussByTitle(keyword) {
  return privateHttpRequest.get(`/api/posts/search/${keyword}`).then((response) => response.data);
}

//update post
export function updatePost(post, postId) {
  console.log(post);
  return privateHttpRequest.put(`/api/posts/${postId}`, post).then((response) => response.data);
}
