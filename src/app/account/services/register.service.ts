import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { UserCreateForm } from "../models/user-register.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + '/register';

  register(userCreateForm: UserCreateForm): Observable<User> {
    return this.http.post<User>(this.apiUrl, userCreateForm);
  }
}
