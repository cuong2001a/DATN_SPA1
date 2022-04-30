import instance from './instance';

export const listBrand = () => {
  const url = '/list-brand';
  return instance.get(url);
};

export const listRelatedBrand = (id) => {
  const url = `/list-brand/related/${id}`;
  return instance.get(url);
};

export const listSearchBrand = (name) => {
  const url = `/search-brand?name=${name}`;
  return instance.get(url);
};

export const readBrand = (id) => {
  const url = `/read-brand/${id}`;
  return instance.get(url);
};

export const createBrand = (data) => {
  const url = `/create-brand`;
  return instance.post(url, data);
};

export const updateBrand = (id, data) => {
  const url = `/update-brand/${id}`;
  return instance.put(url, data);
};

export const removeBrand = (id) => {
  const url = `/remove-brand/${id}`;
  return instance.delete(url);
};
