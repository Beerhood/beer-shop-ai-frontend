import { IType, ProductTypes } from './';

export interface IProduct {
  _id: string;
  title: string;
  image: string;
  description: string;
  type: IType;
  price: number;
  productType: ProductTypes;
  brand: string;
  country: string;
  details: {
    ABV?: number; // Alcohol By Volume, measure of the amount of pure alcohol
    IBU?: number; // International Bitterness Units, measure of a beer's bitterness
    OG?: number; // Original Gravity, measure of the density of wort before yeast is added for fermentation
    flavor?: string;
    style?: string;
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
