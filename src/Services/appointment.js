import instance from './instance';

export const listAppointment = () => {
  const url = '/list-appointment';
  return instance.get(url);
};

export const listAppointmentByPhone = (phone) => {
  const url = `/list-appointment-by-phone?phone=${phone}`;
  return instance.get(url);
};

export const readAppointment = (id) => {
  const url = `/read-appointment/${id}`;
  return instance.get(url);
};

export const createAppointment = (data) => {
  const url = `/create-appointment`;
  return instance.post(url, data);
};

export const updateAppointment = (id, data) => {
  const url = `/update-appointment/${id}`;
  return instance.put(url, data);
};

export const removeAppointment = (id) => {
  const url = `/remove-appointment/${id}`;
  return instance.delete(url);
};
