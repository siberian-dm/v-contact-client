export type ContactDto = {
  id: number;
  avatar?: string;
  fullName: string;
  phone: string;
  email: string;
  tags?: string[];
};

export type UserDto = {
  id: number;
  name: string;
  email: string;
};

export type UserCredentials = {
  email: string;
  password: string;
};

export type LoginResponseData = {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
};

export type GetContactListParams = {
  name?: string;
  _page?: number;
  _limit?: number;
  _sort?: 'id' | 'fullName';
  _order?: 'asc' | 'desc';
  q?: string;
};

export type GetContactByIdParams = {
  id: number;
};

export type CreateContactParams = {
  payload: Omit<ContactDto, 'id'>;
};

export type UpdateContactParams = {
  id: number;
  payload: Partial<ContactDto>;
};

export type DeleteContactParams = {
  id: number;
};
