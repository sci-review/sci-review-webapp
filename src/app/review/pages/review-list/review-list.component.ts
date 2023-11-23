import { Component, computed, inject, Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from "../../services/review.service";
import { AppStoreService } from "../../../account/services/app-store.service";
import { Review } from "../../models/review.model";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterLink } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ReviewFormComponent } from "../review-form/review-form.component";
import { ReviewTypePipe } from "../../pipes/review-type.pipe";

@Component({
  selector: 'app-review-list',
  standalone: true,
    imports: [CommonModule, MatToolbarModule, MatIconModule, RouterLink, MatCardModule, MatButtonModule, ReviewFormComponent, ReviewTypePipe],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss'
})
export class ReviewListComponent {
  appStoreService = inject(AppStoreService);
  reviewService = inject(ReviewService);
  router = inject(Router);
  reviews: Review[] = [];

  ngOnInit() {
    this.appStoreService.setLoading(true);
    this.reviewService.list().subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.appStoreService.setLoading(false);
      },
      error: (err) => {
        this.appStoreService.setLoading(false);
        console.log(err);
      }
    });
  }
}
