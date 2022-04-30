import instance from './instance';

export const listPosition = () => {
  const url = '/list-position';
  return instance.get(url);
};

export const readPosition = (id) => {
  const url = `/read-position/${id}`;
  return instance.get(url);
};

export const createPosition = (data) => {
  const url = `/create-position`;
  return instance.post(url, data);
};

export const updatePosition = (id, data) => {
  const url = `/update-position/${id}`;
  return instance.put(url, data);
};

export const removePosition = (id) => {
  const url = `/remove-position/${id}`;
  return instance.delete(url);
};
