import axios, { AxiosError, AxiosInstance } from 'axios';
import { API_URL } from 'shared/config';
import { getApiErrorMessage, notify } from '~shared/lib';

const REQUEST_TIMEOUT = 20000;

export const createAPI = (_onUnauthorized?: () => void): AxiosInstance => {
  const api = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,

    (error: AxiosError) => {
      // const { response } = error;

      // if (response?.status === HttpCode.Unauthorized) {
      //   onUnauthorized();
      // }

      // if (response?.status === HttpCode.NotFound) {
      //   browserHistory.push(AppRoute.NotFound);
      // }
      notify({ type: 'error', message: getApiErrorMessage(error) });

      return Promise.reject(error);
    }
  );

  api.interceptors.request.use((config) => {
    // const token = getToken();

    // if (token) {
    //   config.headers['x-token'] = token;
    // }

    return config;
  });

  return api;
};

export const apiInstance = createAPI();
