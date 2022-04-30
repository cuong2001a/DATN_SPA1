import instance from './instance';

export const listCustomer = () => {
  const url = '/list-customer';
  return instance.get(url);
};

export const findCustomer = (phone) => {
  const url = `/find-customer?phone=${phone}`;
  return instance.get(url);
};

export const readCustomer = (id) => {
  const url = `/read-customer/${id}`;
  return instance.get(url);
};

export const createCustomer = (data) => {
  const url = `/create-customer`;
  return instance.post(url, data);
};

export const updateCustomer = (id, data) => {
  const url = `/update-customer/${id}`;
  return instance.put(url, data);
};

export const removeCustomer = (id) => {
  const url = `/remove-customer/${id}`;
  return instance.delete(url);
};
