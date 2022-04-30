import instance from './instance';

export const listWorkdayHistory = () => {
  const url = '/list/workday/history';
  return instance.get(url);
};

export const readWorkdayHistory = (id) => {
  const url = `/read/workday/history/${id}`;
  return instance.get(url);
};

export const findWorkDayHistoryByStaffId = (id, day) => {
  const url = `/find/workday/history/by/staff?staffId=${id}&day=${day}`;
  return instance.get(url);
};

export const createWorkdayHistory = (data) => {
  const url = `/create/workday/history`;
  return instance.post(url, data);
};

export const updateWorkdayHistory = (id, data) => {
  const url = `/update/workday/history/${id}`;
  return instance.put(url, data);
};

export const removeWorkdayHistory = (id) => {
  const url = `/remove/workday/history/${id}`;
  return instance.delete(url);
};
