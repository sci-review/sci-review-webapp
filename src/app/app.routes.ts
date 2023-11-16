import { Routes } from '@angular/router';
import { RegisterComponent } from "./account/pages/register/register.component";
import { LoginComponent } from "./account/pages/login/login.component";
import { HomeComponent } from "./dashboard/pages/home/home.component";
import { authGuard } from "./account/guards/auth.guard";

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
  {
    path: 'dashboard',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ]
  },
];
