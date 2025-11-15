import { Type, ProductTypes } from './';

export interface Product {
  _id: string;
  name: string;
  description: string;
  type: Type;
  price: number;
  productType: ProductTypes;
  country?: string;
  ABV?: number;
}

export interface ProductsApiResponse {
  items: Product[];
  totalCount: number;
}

export interface ProductApiResponse extends Product {
  createdAt: Date;
  updatedAt: Date;
}
