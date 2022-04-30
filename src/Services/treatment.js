import instance from './instance';

export const listTreatment = () => {
  const url = '/list-treatment';
  return instance.get(url);
};

export const createTreatment = (data) => {
  const url = `/create-treatment`;
  return instance.post(url, data);
};

export const updateTreatment = (id, data) => {
  const url = `/update-treatment/${id}`;
  return instance.put(url, data);
};

export const removeTreatment = (id) => {
  const url = `/remove-treatment/${id}`;
  return instance.delete(url);
};
