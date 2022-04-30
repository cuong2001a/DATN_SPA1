import instance from './instance';

export const listDetailInvoice = () => {
  const url = '/list/detail/invoice';
  return instance.get(url);
};

export const readDetailInvoice = (id) => {
  const url = `/read/detail/invoice/${id}`;
  return instance.get(url);
};

export const createDetailInvoice = (data) => {
  const url = `/create/detail/invoice`;
  return instance.post(url, data);
};

export const updateDetailInvoice = (id, data) => {
  const url = `/update/detail/invoice/${id}`;
  return instance.put(url, data);
};

export const removeDetailInvoice = (id) => {
  const url = `/remove/detail/invoice/${id}`;
  return instance.delete(url);
};
