import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from "@angular/core";
import { AppStoreService } from "../services/app-store.service";

export const accessTokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Access token interceptor');
  const appStoreService = inject(AppStoreService);
  const interceptorSkipHeader: string = 'Skip-Interceptor';

  if (req.headers.has(interceptorSkipHeader)) {
    console.log('Skipping interceptor', req.url)
    const headers = req.headers.delete(interceptorSkipHeader);
    return next(req.clone({ headers }));
  }

  const accessToken = appStoreService.loggedInUser()?.accessToken;

  if (accessToken == null) {
    console.log('No access token found, skipping interceptor', req.url);
    return next(req);
  }

  if (accessToken) {
    const authReq = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + accessToken)
    });
    return next(authReq);
  }

  return next(req);
};
