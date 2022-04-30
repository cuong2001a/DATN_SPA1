import instance from './instance';

export const listContact = () => {
  const url = '/list-contact';
  return instance.get(url);
};

export const readContact = (id) => {
  const url = `/read-contact/${id}`;
  return instance.get(url);
};

export const createContact = (data) => {
  const url = `/create-contact`;
  return instance.post(url, data);
};

export const updateContact = (id, data) => {
  const url = `/update-contact/${id}`;
  return instance.put(url, data);
};

export const removeContact = (id) => {
  const url = `/remove-contact/${id}`;
  return instance.delete(url);
};
