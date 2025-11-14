import { UserRoles } from './';

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  birthDate: Date;
  address?: string;
}

export interface IUsersApiResponse {
  items: IUser[];
  totalCount: number;
}

export interface IUserApiResponse extends IUser {
  createdAt: Date;
  updatedAt: Date;
}
