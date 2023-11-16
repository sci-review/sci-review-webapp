import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { Router, RouterLink } from "@angular/router";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { RegisterService } from "../../services/register.service";
import { handleServerErrors } from "../../../common/handler-error";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressBarModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  router = inject(Router)
  registerService = inject(RegisterService)
  loading = false;
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100),]),
      email: new FormControl('', [Validators.required, Validators.email], ),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(60),]),
      passwordConfirmation: new FormControl('', [Validators.required,]),
    }, { validators: this.passwordMatchValidator })
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const passwordConfirmation = control.get('passwordConfirmation');
    const error = { nomatch: true };
    const isValid = password?.value === passwordConfirmation?.value;
    if (!isValid) {
      passwordConfirmation?.setErrors(error);
    }
    return isValid ? null : error;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    this.registerService.register(this.form.value)
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: (error) => {
          this.loading = false;
          handleServerErrors(error, this.form);
        }
      });
  }
  hasError(name: string, err: string) {
    return this.form.controls[name].hasError(err);
  }
}
