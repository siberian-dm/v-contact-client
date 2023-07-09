import { apiInstance } from './base';
import type { ContactDto } from './types';

const BASE_URL = '/contacts';

export type GetContactListParams = {
  name?: string;
};

export const getContactList = async (params?: GetContactListParams) => {
  return await apiInstance.get<ContactDto[]>(BASE_URL, { params });
};

export type GetContactByIdParams = {
  id: number;
};

export const getContactById = ({ id, ...params }: GetContactByIdParams) => {
  return apiInstance.get<ContactDto>(`${BASE_URL}/${id}`, { params });
};

export type CreateContactByIdParams = {
  payload: Omit<ContactDto, 'id'>;
};

export const createContact = ({ payload }: CreateContactByIdParams) => {
  return apiInstance.post<ContactDto>(BASE_URL, payload);
};

export type UpdateContactByIdParams = {
  id: number;
  payload: Partial<ContactDto>;
};

export const updateContact = ({ id, payload }: UpdateContactByIdParams) => {
  return apiInstance.put<ContactDto>(`${BASE_URL}/${id}`, payload);
};

export type DeleteContactByIdParams = {
  id: number;
};

export const deleteContact = ({ id }: DeleteContactByIdParams) => {
  return apiInstance.delete<ContactDto>(`${BASE_URL}/${id}`);
};
