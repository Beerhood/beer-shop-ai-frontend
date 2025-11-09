import { IType, ProductTypes } from './';

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  type: IType;
  price: number;
  productType: ProductTypes;
  country?: string;
  ABV?: number;
}

export interface IProductsApiResponse {
  items: IProduct[];
  total_count: number;
}

export interface IProductApiResponse extends IProduct {
  createdAt: Date;
  updatedAt: Date;
}
