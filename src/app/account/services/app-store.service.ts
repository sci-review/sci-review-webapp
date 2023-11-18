import { computed, inject, Injectable, signal } from '@angular/core';
import { TokenResponse } from "../models/auth.model";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  private _loading = signal<boolean>(false);
  private _loggedInUser = signal<TokenResponse | null>(null);
  loggedInUser = computed(this._loggedInUser);
  loading = computed(this._loading);
  tokenService = inject(TokenService);

  constructor() {
    const tokenResponse = this.tokenService.getTokenResponse();
    this._loggedInUser.set(tokenResponse);
  }

  setLoggedInUser(value: TokenResponse): void {
    this._loggedInUser.set(value);
  }

  removeLoggedInUser() {
    this._loggedInUser.update(() => null);
  }

  setLoading(value: boolean): void {
    this._loading.set(value);
  }

  get loggedInUserValue(): TokenResponse | null {
    return this._loggedInUser();
  }
}
