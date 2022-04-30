import instance from './instance';

export const listAppointmentTreatmentDetail = () => {
  const url = '/list/appointment/treatment/detail';
  return instance.get(url);
};

export const createAppointmentTreatmentDetail = (data) => {
  const url = `/create/appointment/treatment/detail`;
  return instance.post(url, data);
};

export const updateAppointmentTreatmentDetail = (id, data) => {
  const url = `/update/appointment/treatment/detail/${id}`;
  return instance.put(url, data);
};

export const removeAppointmentTreatmentDetail = (id) => {
  const url = `/remove/appointment/treatment/detail/${id}`;
  return instance.delete(url);
};
