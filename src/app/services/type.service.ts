import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Type, TypesApiResponse, TypeApiResponse } from 'src/app/models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class TypeService extends BaseService<Type, TypesApiResponse, TypeApiResponse> {
  protected readonly apiUrl = `${environment.apiUrl}/type`;
}
