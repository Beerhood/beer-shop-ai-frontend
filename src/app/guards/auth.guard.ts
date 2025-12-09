import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, take, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

function checkAuth(requireAuth: boolean): Observable<boolean> {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const redirectUrl = requireAuth ? '/auth' : '/home';
  return authService.user$.pipe(
    take(1),
    map((user) => {
      if (requireAuth && !user) {
        router.navigate([redirectUrl]);
        return false;
      }
      if (!requireAuth && user) {
        router.navigate([redirectUrl]);
        return false;
      }
      return true;
    }),
  );
}

export const authGuard: CanActivateFn = (route, state) => {
  const requireAuth = route.data['requireAuth'] ?? true;
  return checkAuth(requireAuth);
};
