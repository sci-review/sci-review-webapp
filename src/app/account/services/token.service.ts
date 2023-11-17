import { Injectable } from '@angular/core';
import { TokenResponse } from "../models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  setAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  }

  setTokenResponse(tokenResponse: TokenResponse): void {
    localStorage.setItem('tokenResponse', JSON.stringify(tokenResponse));
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  getTokenResponse(): TokenResponse | null {
    const tokenResponse = localStorage.getItem('tokenResponse');
    return tokenResponse ? JSON.parse(tokenResponse) : null;
  }

  removeTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenResponse');
  }
}
