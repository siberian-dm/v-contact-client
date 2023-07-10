export const NEW_CONTACT_ID = 'new_contact';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_LIMIT = 10;

export const PAGE_PATH = {
  root: '/',
  signUp: '/sign_up',
  signIn: '/sign_in',
  contacts: {
    root: '/contacts',
    details: (id: number | string) => `/contacts/${id}`,
  },
  page404: '/404',
};

const getEnvVar = (key: string) => {
  if (import.meta.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return import.meta.env[key] || '';
};

/** API entrypoint */
export const API_URL = getEnvVar('VITE_APP_API_URL');

export const isDevEnv = getEnvVar('DEV'); // Vite feature
export const isProdEnv = getEnvVar('PROD'); // Vite feature

export const USER_KEY = 'user';
export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
