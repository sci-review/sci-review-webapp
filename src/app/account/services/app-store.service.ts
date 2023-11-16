import { computed, Injectable, signal } from '@angular/core';
import { TokenResponse } from "../models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  private _loggedInUser = signal<TokenResponse | null>(null);
  loggedInUser = computed(this._loggedInUser);

  setLoggedInUser(value: TokenResponse): void {
    this._loggedInUser.set(value);
  }
}
