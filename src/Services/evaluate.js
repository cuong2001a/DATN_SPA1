import instance from './instance';

export const listEvaluate = () => {
  const url = '/list-evaluate';
  return instance.get(url);
};

export const listEvaluateByProduct = (idProduct) => {
  const url = `/list-evaluate/${idProduct}`;
  return instance.get(url);
};

export const createEvaluate = (data) => {
  const url = `/create-evaluate`;
  return instance.post(url, data);
};

export const readEvaluate = (id) => {
  const url = `/read-evaluate/${id}`;
  return instance.get(url);
};

export const updateEvaluate = (id, data) => {
  const url = `/update-evaluate/${id}`;
  return instance.put(url, data);
};

export const removeEvaluate = (id) => {
  const url = `/remove-evaluate/${id}`;
  return instance.delete(url);
};
