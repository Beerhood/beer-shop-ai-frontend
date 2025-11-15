import {UserRoles} from './';

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  birthDate: Date
}

export interface UsersApiResponse {
  items: User[];
  totalCount: number;
}

export interface UserApiResponse extends User {
  createdAt: Date;
  updatedAt: Date;
}
