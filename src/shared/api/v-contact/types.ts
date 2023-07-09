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
  password: string;
};

export type UserCredentials = {
  email: UserDto['email'];
  password: UserDto['password'];
};
