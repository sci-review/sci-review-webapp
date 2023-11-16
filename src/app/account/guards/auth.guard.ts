import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).userIsLoggedIn()) {
    return true;
  }

  return createUrlTreeFromSnapshot(route, ['/login']);
};
