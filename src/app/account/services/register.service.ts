import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { UserCreateForm } from "../models/user-register.model";
import { environment } from "../../../environments/environment";
import { BaseService } from "../../common/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + '/register';

  constructor() {
    super();
  }

  register(userCreateForm: UserCreateForm): Observable<User> {
    return this.http.post<User>(this.apiUrl, userCreateForm, this.httpOptionsSkipInterceptor);
  }
}
