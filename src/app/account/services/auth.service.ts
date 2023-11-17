import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { catchError, map, Observable, pipe, throwError } from "rxjs";
import { LoginForm, TokenResponse } from "../models/auth.model";
import { TokenService } from "./token.service";
import { AppStoreService } from "./app-store.service";
import { BaseService } from "../../common/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  apiUrl = environment.apiUrl;
  http = inject(HttpClient);
  tokenService = inject(TokenService);
  appStoreService = inject(AppStoreService);

  constructor() {
    super();
  }
  login(loginForm: LoginForm): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, loginForm, this.httpOptionsSkipInterceptor).pipe(
        map((tokenResponse: TokenResponse) => {
          this.appStoreService.setLoggedInUser(tokenResponse);
          this.tokenService.setAccessToken(tokenResponse.accessToken);
          this.tokenService.setRefreshToken(tokenResponse.refreshToken);
          this.tokenService.setTokenResponse(tokenResponse);
          return tokenResponse;
        })
    );
  }

  logout(): Observable<void> {
    const logoutForm = { refreshToken: this.tokenService.getRefreshToken() }
    return this.http.post(`${this.apiUrl}/logout`, logoutForm, this.httpOptionsSkipInterceptor).pipe(
      map(() => {
        console.log('User logged out');
        this.appStoreService.removeLoggedInUser();
        this.tokenService.removeTokens();
      }),
      catchError(e => throwError(e))
    );
  }

  userIsLoggedIn() {
    return this.appStoreService.loggedInUser() !== null;
  }


  userIsAdmin() {
    return this.appStoreService.loggedInUser()!!.user.role === 'UserAdmin';
  }
}
