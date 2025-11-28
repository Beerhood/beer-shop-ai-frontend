import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {User, UsersApiResponse, UserApiResponse} from 'src/app/models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User, UsersApiResponse, UserApiResponse> {
  protected readonly apiUrl = `${environment.apiUrl}/user`;
}
