import { Component, inject, Input, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ReviewService } from "../../services/review.service";
import { handleServerErrors } from "../../../common/handler-error";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { Review } from "../../models/review.model";
import { MatErrorsComponent } from "../../../common/components/mat-errors/mat-errors.component";

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressBarModule, ReactiveFormsModule, RouterLink, MatToolbarModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatErrorsComponent],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss'
})
export class ReviewFormComponent {
  router = inject(Router)
  reviewService = inject(ReviewService)
  loading = false;
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255),]),
      type: new FormControl('', [Validators.required, ], ),
      startDate: new FormControl('', [Validators.required,]),
      endDate: new FormControl('', [Validators.required,]),
    })
  }

  get title() {
    return <FormControl<any>> this.form.get('title')!!;
  }

  get type() {
    return <FormControl<any>> this.form.get('type')!!;
  }

  get startDate() {
    return <FormControl<any>> this.form.get('startDate')!!;
  }

  get endDate() {
    return <FormControl<any>> this.form.get('endDate')!!;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    this.reviewService.new(this.form.value)
      .subscribe({
        next: (review: Review) => {
          this.loading = false;
          this.router.navigate(['dashboard', 'reviews', review.id])
        },
        error: (error) => {
          this.loading = false;
          handleServerErrors(error, this.form);
        }
      });
  }
}
