import instance from './instance';

export const listCart = () => {
  const url = '/list-cart';
  return instance.get(url);
};

export const cartByUser = (user_id) => {
  const url = `/list-cart/user?user=${user_id}`;
  return instance.get(url);
};

export const readCart = (id) => {
  const url = `/read-cart/${id}`;
  return instance.get(url);
};

export const createCart = (data) => {
  const url = `/create-cart`;
  return instance.post(url, data);
};

export const updateCart = (id, data) => {
  const url = `/update-cart/${id}`;
  return instance.put(url, data);
};

export const removeCart = (id) => {
  const url = `/remove-cart/${id}`;
  return instance.delete(url);
};

export const removeAllItem = (id) => {
  const url = `/remove-all-item/${id}`;
  return instance.delete(url);
};
