import httpRequest from '~/utils/httpRequest';
export const loadAllCategories = () => {
  return httpRequest.get(`/api/categories/`).then((response) => {
    return response.data;
  });
};
