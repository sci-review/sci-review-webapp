import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { accessTokenInterceptor } from "./account/interceptors/access-token.interceptor";
import { unauthorizedErrorInterceptor } from "./account/interceptors/unauthorized-error.interceptor";
import { forbiddenErrorInterceptor } from "./account/interceptors/forbidden-error.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([
        accessTokenInterceptor,
        unauthorizedErrorInterceptor,
        forbiddenErrorInterceptor,
      ])
    ),
    {
      provide: 'MAT_DATE_LOCALE',
      useValue: 'en-US'
    }
  ]
};
