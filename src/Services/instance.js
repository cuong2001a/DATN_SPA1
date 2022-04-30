import { getToken, getRefreshToken, setToken } from '../Utils/Utils';
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  headers: {
    'content-type': 'application/json'
  }
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalConfig = error.config;

    if (originalConfig.url !== '/login' && error.response) {
      if (error.response.status === 500 || error.response.status === 503) {
        window.location.href = '/404';
      } else if (
        (error.response.status === 401 || error.response.status === 403) &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;
        try {
          const tokenRf = getRefreshToken();
          const ref = await instance.post('/auth/refreshtoken', {
            refreshToken: tokenRf
          });
          console.log(ref);
          const { token } = ref.data;
          setToken(token);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
