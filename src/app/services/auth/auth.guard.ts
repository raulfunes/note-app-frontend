
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const currentUser = inject(AuthService).getToken;

  // 👇 Redirects to another route
  const isAnonymous = !currentUser;
  if (isAnonymous) {
    return inject(Router).createUrlTree(["/", "login"]);
  }

  return true;
};
