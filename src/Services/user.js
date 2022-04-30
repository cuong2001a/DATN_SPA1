import instance from './instance';

export const listUser = () => {
  const url = '/list-user';
  return instance.get(url);
};

export const listSearchUser = (name) => {
  const url = `/search-user?name=${name}`;
  return instance.get(url);
};

export const readUser = (id) => {
  const url = `/read-user/${id}`;
  return instance.get(url);
};

export const createUser = (data) => {
  const url = `/create-user`;
  return instance.post(url, data);
};

export const updateUser = (id, data) => {
  const url = `/update-user/${id}`;
  return instance.put(url, data);
};

export const removeUser = (id) => {
  const url = `/remove-user/${id}`;
  return instance.delete(url);
};
