import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import {IUser, IUsersApiResponse, IUserApiResponse} from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<IUser, IUsersApiResponse, IUserApiResponse> {
  protected readonly apiUrl = `${environment.apiUrl}/invites`;
}
