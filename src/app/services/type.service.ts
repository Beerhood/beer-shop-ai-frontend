import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IType, ITypesApiResponse, ITypeApiResponse } from 'src/app/models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class TypeService extends BaseService<IType, ITypesApiResponse, ITypeApiResponse> {
  protected readonly apiUrl = `${environment.apiUrl}/type`;
}
