import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, Observable, of, retry, throwError} from 'rxjs';

import {HttpErrorResponse as CustomHttpErrorResponse} from 'src/app/interceptors/models/interceptor.interface';
// import {CustomError} from 'src/app/interceptors/models/customErrors.enum';
import {SnackbarService} from 'src/app/services/snackbar.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private snackBarService: SnackbarService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true
    });
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        const errorResponse: CustomHttpErrorResponse = error.error;
        switch (errorResponse.http_code) {
        //   case 400:
        //     if (errorResponse.status === CustomError.ApplicationExists) {
        //       this.snackBarService.showErrorSnackBar(errorResponse.error);
        //       return of();
        //     }

        //     if (
        //       errorResponse.status === CustomError.VacancyClosed ||
        //       errorResponse.status === CustomError.ApplicationCompleted
        //     ) {
        //       this.router.navigate([`candidate/sorry`]);
        //       return of();
        //     }

        //     this.snackBarService.showErrorSnackBar('Bad request');
        //     this.router.navigate(['auth']);
        //     return of();
          case 401:
            this.snackBarService.showError('Unauthorized access');
            this.router.navigate(['auth']);
            return of();
          case 403:
            this.snackBarService.showError('Forbidden');
            this.router.navigate(['auth']);
            return of();
          case 404:
            this.snackBarService.showError('Not found');
            return of();
          default:
            // TODO: implement logic for different error statuses in future
            console.error(errorResponse);
            return throwError(() => error);
        }
      })
    );
  }
}