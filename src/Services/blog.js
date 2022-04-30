import instance from './instance';

export const listBlog = () => {
  const url = '/list-blog';
  return instance.get(url);
};

export const createBlog = (data) => {
  const url = `/create-blog`;
  return instance.post(url, data);
};

export const updateBlog = (id, data) => {
  const url = `/update-blog/${id}`;
  return instance.put(url, data);
};

export const removeBlog = (id) => {
  const url = `/remove-blog/${id}`;
  return instance.delete(url);
};
