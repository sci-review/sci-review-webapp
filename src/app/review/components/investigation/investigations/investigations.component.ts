import { Component, inject, Input, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestigationFormComponent } from "../investigation-form/investigation-form.component";
import { Investigation, Review } from "../../../models/review.model";
import { AppStoreService } from "../../../../account/services/app-store.service";
import { ReviewService } from "../../../services/review.service";
import { MatCardModule } from "@angular/material/card";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-investigations',
  standalone: true,
  imports: [CommonModule, InvestigationFormComponent, MatCardModule, RouterLink],
  templateUrl: './investigations.component.html',
  styleUrl: './investigations.component.scss'
})
export class InvestigationsComponent {
  reviewService = inject(ReviewService);
  @Input() reviewId!: string;
  investigations = signal([] as Investigation[]);

  ngOnInit() {
    this.reviewService.listInvestigations(this.reviewId).subscribe({
      next: (investigations) => {
        this.investigations.set(investigations);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
