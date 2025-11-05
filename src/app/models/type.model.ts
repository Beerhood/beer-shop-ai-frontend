export interface IType {
  _id: string;
  name: string;
}

export interface ITypesApiResponse {
  items: IType[];
  total_count: number;
}

export interface ITypeApiResponse extends IType {
  createdAt: Date;
  updatedAt: Date;
}
