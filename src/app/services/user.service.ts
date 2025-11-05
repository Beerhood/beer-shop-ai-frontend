import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {IUser, IUsersApiResponse, IUserApiResponse} from 'src/app/models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<IUser, IUsersApiResponse, IUserApiResponse> {
  protected readonly apiUrl = `${environment.apiUrl}/user`;
}
