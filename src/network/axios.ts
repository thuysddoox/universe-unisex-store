import axios from 'axios';
import { StorageKeys, localStorageGet, storageClear } from './storage';
import { StatusCodes } from 'http-status-codes';
import { isEmpty } from 'lodash';

// const API_URL = process.env.NEXT_PUBLIC_API_HOST_URL 
const API_URL = 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});
axiosInstance.defaults.timeout = 60000;

axiosInstance.interceptors.request.use(
  async function (config) {
    if (typeof window !== 'undefined') {
      const token = localStorageGet<string>(StorageKeys.TOKEN);
      if (!isEmpty(token) && config.headers && !config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const statusCode = error?.response?.status;
    if (statusCode === StatusCodes.UNAUTHORIZED) {
      //if user uses wrong or expired token, clear it then reload
      storageClear();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
