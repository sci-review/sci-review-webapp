import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, Observable } from "rxjs";
import { LoginForm, TokenResponse } from "../models/auth.model";
import { TokenService } from "./token.service";
import { AppStoreService } from "./app-store.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl + '/login';
  http = inject(HttpClient);
  tokenService = inject(TokenService);
  appStoreService = inject(AppStoreService);

  login(loginForm: LoginForm): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.apiUrl, loginForm).
      pipe(
        map((tokenResponse: TokenResponse) => {
          this.appStoreService.setLoggedInUser(tokenResponse);
          this.tokenService.setAccessToken(tokenResponse.accessToken);
          this.tokenService.setRefreshToken(tokenResponse.refreshToken);
          return tokenResponse;
        })
    );
  }

  userIsLoggedIn() {
    return this.appStoreService.loggedInUser() !== null;
  }
}
