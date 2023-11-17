import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink } from "@angular/router";
import {
  InvestigationsComponent
} from "../../../dashboard/components/investigation/investigations/investigations.component";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { AppStoreService } from "../../../account/services/app-store.service";
import { Investigation } from "../../../dashboard/models/review.model";
import { ReviewService } from "../../../dashboard/services/review.service";

@Component({
  selector: 'app-investigation-show',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule, MatToolbarModule, RouterLink, InvestigationsComponent, MatCardModule, MatTabsModule],
  templateUrl: './investigation-show.component.html',
  styleUrl: './investigation-show.component.scss'
})
export class InvestigationShowComponent {
  @Input() reviewId!: string;
  @Input() investigationId!: string;
  appStoreService = inject(AppStoreService);
  reviewService = inject(ReviewService);
  investigation: Investigation = {} as Investigation;

  ngOnInit() {
    this.reviewService.getInvestigation(this.reviewId, this.investigationId).subscribe({
      next: (investigation) => {
        this.investigation = investigation;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
