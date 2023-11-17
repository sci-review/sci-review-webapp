import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, filter, map, throwError } from "rxjs";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const forbiddenErrorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Forbidden error interceptor');
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 403) {
        console.log('Forbidden error caught by interceptor', err);
        router.navigate(['/dashboard']);
      }
      return throwError(err);
    })
  );
};
