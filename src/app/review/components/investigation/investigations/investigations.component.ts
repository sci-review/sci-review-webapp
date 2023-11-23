import { Component, inject, Input, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestigationFormComponent } from "../investigation-form/investigation-form.component";
import { Investigation, Review } from "../../../models/review.model";
import { ReviewService } from "../../../services/review.service";
import { MatCardModule } from "@angular/material/card";
import { RouterLink } from "@angular/router";
import { InvestigationStatusPipe } from "../../../pipes/investigation-status.pipe";

@Component({
  selector: 'app-investigations',
  standalone: true,
  imports: [CommonModule, InvestigationFormComponent, MatCardModule, RouterLink, InvestigationStatusPipe],
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
