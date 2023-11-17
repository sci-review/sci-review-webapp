import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const unauthorizedErrorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Unauthorized error interceptor');
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        console.log('Unauthorized error caught by interceptor', err);
        authService.logout().subscribe({
          next: () => {
            console.log('User logged out');
          },
          error: () => {
            console.log('Error logging out user');
          }
        })
        router.navigate(['/login']);
      }
      return throwError(err);
    })
  );
};
