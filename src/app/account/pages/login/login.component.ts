import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { handleServerErrors } from "../../../common/handler-error";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatCardModule, MatProgressBarModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  router: Router = inject(Router)
  authService = inject(AuthService);
  loading: boolean = false;
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email], ),
      password: new FormControl('', [Validators.required]),
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    this.authService.login(this.form.value).subscribe(
      {
        next: () => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.loading = false;
          handleServerErrors(error, this.form);
        }
      }
    )
  }

  hasError(name: string, err: string) {
    return this.form.controls[name].hasError(err);
  }
}
