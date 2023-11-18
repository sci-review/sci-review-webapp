import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from "../../../common/components/page-header/page-header.component";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { BaseComponent } from "../../../common/components/base/base.component";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { handleServerErrors } from "../../../common/handler-error";
import { MatIconModule } from "@angular/material/icon";
import { error } from "@angular/compiler-cli/src/transformers/util";
import { ProblemDetail } from "../../../common/models/errors.model";
import { MatErrorsComponent } from "../../../common/components/mat-errors/mat-errors.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatErrorsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent extends BaseComponent {
  userService = inject(UserService);
  user: User | undefined;
  form: FormGroup;
  errors: ProblemDetail | null = null;
  success: boolean = false;
  submitted: boolean = false;

  constructor() {
    super();
    this.form = new FormGroup({
      currentPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(60),]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(60),]),
      passwordConfirmation: new FormControl('', [Validators.required,]),
    }, { validators: this.passwordMatchValidator })
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const passwordConfirmation = control.get('passwordConfirmation');
    const error = { nomatch: true };
    const isValid = newPassword?.value === passwordConfirmation?.value;
    if (!isValid) {
      passwordConfirmation?.setErrors(error);
    }
    return isValid ? null : error;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.errors = null;
    this.submitted = true;
    this.success = false;

    this.userService.changePassword(this.form.value)
      .subscribe({
        next: () => {
          this.submitted = false;
          this.success = true;
          this.resetForm();
        },
        error: (error) => {
          this.submitted = false;
          this.success = false;
          this.errors = error.error;
          this.resetForm();
        }
      });
  }

  get currentPassword(): FormControl {
    return <FormControl<any>> this.form.get('currentPassword')!!;
  }

  get newPassword() {
    return <FormControl<any>> this.form.get('newPassword')!!;
  }

  get passwordConfirmation() {
    return <FormControl<any>> this.form.get('passwordConfirmation')!!;
  }

  resetForm() {
    this.form.reset();
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.setErrors(null) ;
    });
  }

  ngOnInit() {
    this.appStoreService.setLoading(true);
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.appStoreService.setLoading(false);
        this.user = user;
      },
      error: (error) => {
        this.appStoreService.setLoading(false);
        console.log(error);
      }
    });
  }

}
