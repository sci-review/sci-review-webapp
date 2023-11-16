import { Routes } from '@angular/router';
import { RegisterComponent } from "./account/pages/register/register.component";
import { LoginComponent } from "./account/pages/login/login.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
