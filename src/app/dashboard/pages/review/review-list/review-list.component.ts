import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from "../../../services/review.service";
import { AppStoreService } from "../../../../account/services/app-store.service";
import { Review } from "../../../models/review.model";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss'
})
export class ReviewListComponent {
  appStoreService = inject(AppStoreService);
  reviewService = inject(ReviewService);
  reviews: Review[] = [];

  ngOnInit(): void {
    this.appStoreService.setLoading(true);
    this.reviewService.list().subscribe({
      next: (reviews) => {
        this.appStoreService.setLoading(false);
        this.reviews = reviews;
      },
      error: (error) => {
        this.appStoreService.setLoading(false);
        console.log(error);
      }
    });
  }
}
