import { Routes } from '@angular/router';
import { RegisterComponent } from "./account/pages/register/register.component";
import { LoginComponent } from "./account/pages/login/login.component";
import { HomeComponent } from "./dashboard/pages/home/home.component";
import { authGuard } from "./account/guards/auth.guard";
import { ReviewListComponent } from "./review/pages/review-list/review-list.component";
import { ReviewShowComponent } from "./review/pages/review-show/review-show.component";
import { ReviewFormComponent } from "./review/pages/review-form/review-form.component";
import { DashboardComponent } from "./dashboard/pages/dashboard/dashboard.component";
import { InvestigationShowComponent } from "./review/pages/investigation-show/investigation-show.component";

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
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'reviews',
        component: ReviewListComponent,
      },
      {
        path: 'reviews/new',
        component: ReviewFormComponent,
      },
      {
        path: 'reviews/:reviewId',
        component: ReviewShowComponent,
      },
      {
        path: 'reviews/:reviewId/investigations/:investigationId',
        component: InvestigationShowComponent,
      },

    ]
  },
  // {
  //   path: 'reviews/:reviewId/investigations/:investigationId',
  //   component: InvestigationShowComponent,
  // }
];
