import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOrder, IOrdersApiResponse, IOrderApiResponse } from 'src/app/models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService<IOrder, IOrdersApiResponse, IOrderApiResponse> {
  protected readonly apiUrl = `${environment.apiUrl}/order`;
}