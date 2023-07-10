import { apiInstance } from './base';
import type {
  ContactDto,
  GetContactListParams,
  GetContactByIdParams,
  CreateContactParams,
  UpdateContactParams,
  DeleteContactParams,
} from './types';

const BASE_URL = '/contacts';

export const getContactList = async (params?: GetContactListParams) => {
  try {
    const response = await apiInstance.get<ContactDto[]>(BASE_URL, { params });
    return {
      data: response.data,
      meta: {
        total: +response.headers['x-total-count'],
      },
    };
  } catch {
    return undefined;
  }
};

export const getContactById = ({ id, ...params }: GetContactByIdParams) => {
  try {
    return apiInstance.get<ContactDto>(`${BASE_URL}/${id}`, { params });
  } catch {
    return undefined;
  }
};

export const createContact = ({ payload }: CreateContactParams) => {
  try {
    return apiInstance.post<ContactDto>(BASE_URL, payload);
  } catch {
    return undefined;
  }
};

export const updateContact = ({ id, payload }: UpdateContactParams) => {
  try {
    return apiInstance.put<ContactDto>(`${BASE_URL}/${id}`, payload);
  } catch {
    return undefined;
  }
};

export const deleteContact = ({ id }: DeleteContactParams) => {
  try {
    return apiInstance.delete<ContactDto>(`${BASE_URL}/${id}`);
  } catch {
    return undefined;
  }
};
