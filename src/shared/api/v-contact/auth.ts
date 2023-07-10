import { apiInstance } from './base';
import type { UserCredentials, LoginResponseData } from './types';

export const login = async (payload: UserCredentials) => {
  try {
    const response = await apiInstance.post<LoginResponseData>(`/login`, payload);
    return {
      data: response.data,
    };
  } catch {
    return undefined;
  }
};
