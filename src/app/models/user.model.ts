import {UserRoles} from './enums';

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  birthDate: Date
}

export interface IUsersApiResponse {
  items: IUser[];
  total_count: number;
}

export interface IUserApiResponse extends IUser {
  createdAt: Date;
  updatedAt: Date;
}
