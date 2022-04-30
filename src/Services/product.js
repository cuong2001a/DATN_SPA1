import instance from './instance';

export const listProduct = () => {
  const url = '/list-product';
  return instance.get(url);
};
export const filterCategory = (id) => {
  const url = `/filter-category-product?category=${id}`;
  return instance.get(url);
};

export const listSearchProduct = (name) => {
  const url = `/list-search/product?name=${name}`;
  return instance.get(url);
};

export const listRelatedProduct = (id) => {
  const url = `/list-related/product/${id}`;
  return instance.get(url);
};

export const readProduct = (id) => {
  const url = `/read-product/${id}`;
  return instance.get(url);
};

export const createProduct = (data) => {
  const url = `/create-product`;
  return instance.post(url, data);
};

export const updateProduct = (id, data) => {
  const url = `/update-product/${id}`;
  return instance.put(url, data);
};

export const removeProduct = (id) => {
  const url = `/remove-product/${id}`;
  return instance.delete(url);
};
