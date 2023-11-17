import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStoreService } from "../../../../account/services/app-store.service";
import { ReviewService } from "../../../services/review.service";
import { Review } from "../../../models/review.model";
import { Router, RouterLink } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";

@Component({
  selector: 'app-review-show',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule, RouterLink, MatTabsModule, MatSidenavModule, MatListModule],
  templateUrl: './review-show.component.html',
  styleUrl: './review-show.component.scss'
})
export class ReviewShowComponent {
  appStoreService = inject(AppStoreService);
  reviewService = inject(ReviewService);
  review!: Review;
  @Input() reviewId!: string;

  ngOnInit(): void {
    this.appStoreService.setLoading(true);
    this.reviewService.show(this.reviewId).subscribe({
      next: (review) => {
        this.appStoreService.setLoading(false);
        this.review = review;
        console.log(review);
      },
      error: (error) => {
        this.appStoreService.setLoading(false);
        console.log(error);
      }
    });
  }
}
