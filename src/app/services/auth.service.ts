import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { User, UserRoles } from '../models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { environment } from 'src/environments/environment';
import { RefreshTokenResponse } from '../interceptors/models/interceptor.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  private accessTokenSubject = new BehaviorSubject<string | null>(null);
  public accessToken$ = this.accessTokenSubject.asObservable();

  private snackbarService = inject(SnackbarService);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  get currentUser(): User | null {
    return this.userSubject.value;
  }
  get accessToken(): string | null {
    return this.accessTokenSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken && !!this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === UserRoles.ADMIN;
  }

  public handleAuthRedirect(
    accessToken: string,
    showSnackbar: boolean = true,
  ): Observable<RefreshTokenResponse> {
    this.accessTokenSubject.next(accessToken);

    // Fetch user data from the server
    return this.refreshToken().pipe(
      tap({
        next: () => {
          // Show success snackbar if needed
          if (showSnackbar) {
            this.snackbarService.showSuccess('You have successfully logged in!');
          }
        },
        error: () => this.snackbarService.showError('Failed to load user data and logging out.'),
      }),
      // Clean up URL
      switchMap((user) => {
        this.router.navigate([], {
          queryParams: {},
          replaceUrl: true,
        });
        return of(user);
      }),
    );
  }

  public refreshToken(): Observable<RefreshTokenResponse> {
    return this.http
      .post<RefreshTokenResponse>(`${environment.backendUrl}/api/auth/refresh`, {})
      .pipe(
        tap((res) => {
          this.accessTokenSubject.next(res.accessToken);
          this.userSubject.next(res.user);
        }),
        catchError((err) => throwError(() => err)),
      );
  }

  public logout(): Observable<void> {
    const accessToken = this.accessToken;

    if (!accessToken) {
      console.log('No accessToken found. Performing local cleanup only.');
      this.performLocalLogout();
      return of(undefined);
    }

    return this.http.post<void>(`${environment.backendUrl}/api/auth/logout`, {}).pipe(
      tap(() => this.snackbarService.showSuccess('You have successfully logged out.')),
      catchError((err) => {
        console.error('Logout API failed, performing local cleanup:', err);
        this.snackbarService.showError(
          'Logout failed on server, but local session has been cleared.',
        );
        return of(undefined);
      }),
      finalize(() => this.performLocalLogout()),
    );
  }

  private performLocalLogout(): void {
    this.accessTokenSubject.next(null);
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
  }
}
