import { IUser, IProduct, OrderStatuses } from './';

export interface IOrder {
  _id: string;
  user: IUser;
  products: IProduct[];
  address: string;
  totalPrice: number;
  status: OrderStatuses;
}

export interface IOrdersApiResponse {
  items: IOrder[];
  total_count: number;
}

export interface IOrderApiResponse extends IOrder {
  createdAt: Date;
  updatedAt: Date;
}
