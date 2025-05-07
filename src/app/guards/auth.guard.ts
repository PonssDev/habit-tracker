import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ClerkService } from '../services/clerk.service';

export const authGuard: CanActivateFn = (route, state) => {
  const clerkService = inject(ClerkService);
  const router = inject(Router);

  if (clerkService.isSignedIn()) {
    return true;
  }

  return router.parseUrl('/login');
};