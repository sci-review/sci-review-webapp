import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { UserCreateForm } from "../models/user-register.model";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:8080/register';

  register(userCreateForm: UserCreateForm): Observable<User> {
    return this.http.post<User>(this.apiUrl, userCreateForm);
  }
}
