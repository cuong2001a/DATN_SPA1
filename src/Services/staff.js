import instance from './instance';

export const listStaff = () => {
  const url = '/list-staff';
  return instance.get(url);
};

export const findStaff = (userId) => {
  const url = `/find-staff?userId=${userId}`;
  return instance.get(url);
};

export const listSearchStaff = (name) => {
  const url = `/search-staff?name=${name}`;
  return instance.get(url);
};

export const readStaff = (id) => {
  const url = `/read-staff?user_id=${id}`;
  return instance.get(url);
};

export const createStaff = (data) => {
  const url = `/create-staff`;
  return instance.post(url, data);
};

// id của nhân viên và data là service_id của dịch vụ
// sau khi cập nhật nhân viên thì cần dispatch lại emloyee_job_detail để cập nhật lại dịch vụ
export const updateStaff = (id, data) => {
  const url = `/update-staff/${id}`;
  return instance.put(url, data);
};

export const removeStaff = (id) => {
  const url = `/remove-staff/${id}`;
  return instance.delete(url);
};
