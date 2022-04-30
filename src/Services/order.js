import instance from './instance';

export const listOrder = () => {
  const url = '/list-order';
  return instance.get(url);
};
export const orderByUser = (idUser) => {
  const url = `/list-order/${idUser}`;
  return instance.get(url);
};

export const readOrder = (id) => {
  const url = `/read-order/${id}`;
  return instance.get(url);
};

export const createOrder = (data) => {
  const url = `/create-order`;
  return instance.post(url, data);
};

export const updateOrder = (id, data) => {
  const url = `/update-order/${id}`;
  return instance.put(url, data);
};

export const removeOrder = (id) => {
  const url = `/remove-order/${id}`;
  return instance.delete(url);
};
