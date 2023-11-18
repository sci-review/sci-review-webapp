import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-mat-errors',
  standalone: true,
  imports: [CommonModule],
  template: "{{  errorMessage }}"
})
export class MatErrorsComponent {
  @Input() fieldName!: string;
  @Input() field!: FormControl

  get errorMessage() {
    if (this.field.errors?.['required']) {
      return `${this.fieldName} is required`
    } else if (this.field.errors?.['minlength']) {
      return `${this.fieldName} must be at least ${this.field.errors?.['minlength'].requiredLength} characters`
    } else if (this.field.errors?.['maxlength']) {
      return `${this.fieldName} must be no more than ${this.field.errors?.['maxlength'].requiredLength} characters`
    } else if (this.field.errors?.['email']) {
      return `${this.fieldName} must be a valid email address`
    } else if (this.field.errors?.['nomatch']) {
      return `${this.fieldName} must match password`
    } else if (this.field.errors?.['serverError']) {
      return `Server Error: ${this.field.errors?.['serverError']}`
    } else {
      return `${this.fieldName}: invalid`
    }
  }
}
