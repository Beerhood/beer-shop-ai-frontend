import { IType, ProductTypes } from './';

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  description: string;
  type: IType;
  price: number;
  productType: ProductTypes;
  details: {
    country?: string;
    ABV?: number;
    flavour?: string;
  };
}

export interface IProductsApiResponse {
  items: IProduct[];
  totalCount: number;
}

export interface IProductApiResponse extends IProduct {
  createdAt: Date;
  updatedAt: Date;
}
