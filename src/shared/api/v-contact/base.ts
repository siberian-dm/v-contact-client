import axios, { AxiosError, AxiosInstance } from 'axios';
import { ACCESS_TOKEN_KEY, API_URL } from '~shared/config';
import { getApiErrorMessage, notify } from '~shared/lib';

const REQUEST_TIMEOUT = 20000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,

    (error: AxiosError) => {
      notify({ type: 'error', message: getApiErrorMessage(error) });

      return Promise.reject(error);
    }
  );

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  return api;
};

export const apiInstance = createAPI();
