import { User, Product, OrderStatuses } from './';

export interface Order {
  _id: string;
  user: User;
  products: Product[];
  address: string;
  totalPrice: number;
  status: OrderStatuses;
}

export interface OrdersApiResponse {
  items: Order[];
  totalCount: number;
}

export interface OrderApiResponse extends Order {
  createdAt: Date;
  updatedAt: Date;
}
