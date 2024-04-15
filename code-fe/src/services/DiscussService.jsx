import { httpRequest, privateHttpRequest } from '~/utils/httpRequest';
export const createPost = (postData) => {
  return privateHttpRequest
    .post(`/api/user/${postData.userId}/category/${postData.categoryId}/posts`, postData)
    .then((response) => {
      response.data;
    });
};

export const loadAllPosts = (pageNumber, pageSize) => {
  return httpRequest
    .get(`/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`)
    .then((response) => {
      response.data;
    });
};

export const loadPost = (postId) => {
  return httpRequest.get('/api/posts/' + postId).then((response) => {
    response.data;
  });
};

export const loadComment = (commentId) => {
  return httpRequest.get('/api/post/comments' + commentId).then((response) => response.data);
};

export const createComment = (comment, postId) => {
  return privateHttpRequest.post(`/api/post/${postId}/comments`, comment);
};

export const uploadPostImage = (image, postId) => {
  debugger;
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

export function loadPostUserWise(userId) {
  return privateHttpRequest.get(`/user/${userId}/posts`).then((response) => response.data);
}

export function deletePostService(postId) {
  return privateHttpRequest.delete(`/api/posts/${postId}`).then((response) => response.data);
}

//update post
export function updatePost(post, postId) {
  console.log(post);
  return privateHttpRequest.put(`/api/posts/${postId}`, post).then((response) => response.data);
}
