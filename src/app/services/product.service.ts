import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProduct, IProductsApiResponse, IProductApiResponse } from 'src/app/models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService<IProduct, IProductsApiResponse, IProductApiResponse> {
  protected readonly apiUrl = `${environment.apiUrl}/product`;
}
