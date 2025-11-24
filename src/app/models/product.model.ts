import { Type, ProductTypes } from './';

export interface Product {
  _id: string;
  title: string;
  image: string;
  description: string;
  type: Type;
  price: number;
  productType: ProductTypes;
  details: {
    country?: string;
    ABV?: number; // Alcohol By Volume, measure of the amount of pure alcohol
    IBU?: number; // International Bitterness Units, measure of a beer's bitterness
    OG?: number; // Original Gravity, measure of the density of wort before yeast is added for fermentation
  };
}

export interface ProductsApiResponse {
  items: Product[];
  totalCount: number;
}

export interface ProductApiResponse extends Product {
  createdAt: Date;
  updatedAt: Date;
}
