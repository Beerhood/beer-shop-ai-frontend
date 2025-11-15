export interface Type {
  _id: string;
  name: string;
}

export interface TypesApiResponse {
  items: Type[];
  totalCount: number;
}

export interface TypeApiResponse extends Type {
  createdAt: Date;
  updatedAt: Date;
}
