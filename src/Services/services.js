import instance from './instance';

export const listService = () => {
  const url = '/list-service';
  return instance.get(url);
};
export const filterCategory = (id) => {
  const url = `/filter-category-service?category=${id}`;
  return instance.get(url);
};

export const listSearchService = (name) => {
  const url = `/list-search/service?name=${name}`;
  return instance.get(url);
};

export const listRelatedService = (id) => {
  const url = `/list-related/service?id=${id}`;
  return instance.get(url);
};

export const readService = (id) => {
  const url = `/read-service/${id}`;
  return instance.get(url);
};

export const createService = (data) => {
  const url = `/create-service`;
  return instance.post(url, data);
};

export const updateService = (id, data) => {
  const url = `/update-service/${id}`;
  return instance.put(url, data);
};

export const removeService = (id) => {
  const url = `/remove-service/${id}`;
  return instance.delete(url);
};
