import { ProductTypes } from "./";

export interface Type {
  _id: string;
  name: string;
  productType: ProductTypes;
}

export interface TypesApiResponse {
  items: Type[];
  totalCount: number;
}

export interface TypeApiResponse extends Type {
  createdAt: Date;
  updatedAt: Date;
}
