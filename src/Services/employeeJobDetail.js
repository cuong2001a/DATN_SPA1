import instance from './instance';

export const listEmployeeJobDetail = () => {
  const url = '/list/employee/job/detail';
  return instance.get(url);
};

export const readEmployeeJobDetail = (id) => {
  const url = `/read/employee/job/detail/${id}`;
  return instance.get(url);
};

export const createEmployeeJobDetail = (data) => {
  const url = `/create/employee/job/detail`;
  return instance.post(url, data);
};

export const updateEmployeeJobDetail = (id, data) => {
  const url = `/update/employee/job/detail/${id}`;
  return instance.put(url, data);
};

export const removeEmployeeJobDetail = (id) => {
  const url = `/remove/employee/job/detail/${id}`;
  return instance.delete(url);
};

export const updateSchedule = (staff, data) => {
  const url = `/update/schedule?staff=${staff}`;
  return instance.put(url, data);
};

export const findStaffId = (staffId) => {
  const url = `/find-staff-to-id?staffId=${staffId}`;
  return instance.get(url);
};
