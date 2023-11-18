import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { User } from "../models/user.model";
import { Observable } from "rxjs";
import { BaseService } from "../../common/services/base.service";
import { AppStoreService } from "./app-store.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  http = inject(HttpClient);
  appStoreService = inject(AppStoreService);
  apiUrl = environment.apiUrl;

  constructor() {
    super();
  }

  getProfile(): Observable<User> {
    const loggedInUser = this.appStoreService.loggedInUserValue?.user.id;
    return this.http.get<User>(`${this.apiUrl}/user/${loggedInUser}`, this.httpOptions);
  }
}
