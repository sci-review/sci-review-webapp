import { Component, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink } from "@angular/router";
import { ReviewService } from "../../../services/review.service";
import { handleServerErrors } from "../../../../common/handler-error";
import { Investigation } from "../../../models/review.model";

@Component({
  selector: 'app-investigation-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatProgressBarModule, MatSelectModule, MatToolbarModule, ReactiveFormsModule, RouterLink],
  templateUrl: './investigation-form.component.html',
  styleUrl: './investigation-form.component.scss'
})
export class InvestigationFormComponent {
  reviewService = inject(ReviewService)
  loading = false;
  form: FormGroup;
  @Input() reviewId!: string;
  @Input() investigations: WritableSignal<Investigation[]> = signal([] as Investigation[]);

  constructor() {
    this.form = new FormGroup({
      question: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255),]),
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    this.reviewService.newInvestigationQuestion(this.reviewId, this.form.value)
      .subscribe({
        next: (investigation) => {
          this.loading = false;
          this.investigations.update((investigations) => [...investigations, investigation]);
          console.log(investigation)
        },
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
