import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order, OrdersApiResponse, OrderApiResponse } from 'src/app/models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService<Order, OrdersApiResponse, OrderApiResponse> {
  protected readonly apiUrl = `${environment.apiUrl}/order`;
}