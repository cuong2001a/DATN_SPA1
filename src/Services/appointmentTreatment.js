import instance from './instance';

export const listAppointmentTreatment = () => {
  const url = '/list/appointment/treatment';
  return instance.get(url);
};

export const createAppointmentTreatment = (data) => {
  const url = `/create/appointment/treatment`;
  return instance.post(url, data);
};

export const updateAppointmentTreatment = (id, data) => {
  const url = `/update/appointment/treatment/${id}`;
  return instance.put(url, data);
};

export const removeAppointmentTreatment = (id) => {
  const url = `/remove/appointment/treatment/${id}`;
  return instance.delete(url);
};
