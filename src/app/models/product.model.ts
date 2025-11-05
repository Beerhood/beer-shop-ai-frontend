import { IType, ProductTypes } from './';

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  type: IType;
  price: string;
  productType: ProductTypes;
  country: string;
  ABV: string;
}

export interface IProductsApiResponse {
  items: IProduct[];
  total_count: number;
}

export interface IProductApiResponse extends IProduct {
  createdAt: Date;
  updatedAt: Date;
}
