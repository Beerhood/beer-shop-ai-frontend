import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product, ProductsApiResponse, ProductApiResponse } from 'src/app/models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService<Product, ProductsApiResponse, ProductApiResponse> {
  protected readonly apiUrl = `${environment.apiUrl}/products`;
}
