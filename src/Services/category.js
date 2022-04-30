import instance from './instance';

export const listCategory = () => {
  const url = '/list-category';
  return instance.get(url);
};

export const listRelatedCategory = (id) => {
  const url = `/list-category/related/${id}`;
  return instance.get(url);
};

export const listSearchCategory = (name) => {
  const url = `/search-category?name=${name}`;
  return instance.get(url);
};

export const readCategory = (id) => {
  const url = `/read-category/${id}`;
  return instance.get(url);
};

export const createCategory = (data) => {
  const url = `/create-category`;
  return instance.post(url, data);
};

export const updateCategory = (id, data) => {
  const url = `/update-category/${id}`;
  return instance.put(url, data);
};

export const removeCategory = (id) => {
  const url = `/remove-category/${id}`;
  return instance.delete(url);
};
