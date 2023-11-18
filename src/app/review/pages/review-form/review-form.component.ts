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
import { Review } from "../../models/review.model";
import { MatErrorsComponent } from "../../../common/components/mat-errors/mat-errors.component";
import { HttpErrorResponse } from "@angular/common/http";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import moment from "moment/moment";

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressBarModule, ReactiveFormsModule, RouterLink, MatToolbarModule, MatSelectModule, MatDatepickerModule, MatMomentDateModule, MatErrorsComponent],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss'
})
export class ReviewFormComponent {
  router = inject(Router)
  reviewService = inject(ReviewService)
  loading = false;
  form: FormGroup;
  @Input() reviewId: string | null = null
  days = 0
  weeks = 0;

  constructor() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255),]),
      type: new FormControl('', [Validators.required, ], ),
      startDate: new FormControl('', [Validators.required,]),
      endDate: new FormControl('', [Validators.required,]),
    });
  }

  ngOnInit() {
    if (this.reviewId) {
      this.reviewService.show(this.reviewId)
        .subscribe({
          next: (review: Review) => {
            this.form.patchValue(review);
            this.updateDaysAndWeeks(review.startDate, review.endDate);
          }
        })
    }
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

    if (this.reviewId) {
      this.updateReview();
    } else {
      this.newReview();
    }
  }

  updateReview() {
    this.reviewService.update(this.reviewId!!, this.form.value)
      .subscribe({
        next: (review: Review) => this.handleSuccess(review),
        error: (error) => this.handleError(error)
      });
  }

  newReview() {
    this.reviewService.new(this.form.value)
      .subscribe({
        next: (review: Review) => this.handleSuccess(review),
        error: (error) => this.handleError(error)
      });
  }

  handleSuccess(review: Review) {
    this.loading = false;
    this.router.navigate(['dashboard', 'reviews', review.id])
  }

  handleError(error: HttpErrorResponse) {
    this.loading = false;
    handleServerErrors(error, this.form);
  }

  endDateChange() {
    if (this.endDate.value !== null) {
      this.updateDaysAndWeeks(this.startDate.value, this.endDate.value);
    }
  }

  updateDaysAndWeeks(startDate: moment.Moment, endDate: moment.Moment) {
    const cloneStartDate = endDate.clone().add(1, 'days');
    this.days = cloneStartDate.diff(startDate, 'days');
    this.weeks = cloneStartDate.diff(startDate, 'weeks');
  }
}
