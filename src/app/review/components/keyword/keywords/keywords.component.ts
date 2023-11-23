import { Component, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { KeywordFormComponent } from "../keyword-form/keyword-form.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { ReviewService } from "../../../services/review.service";
import { Investigation, InvestigationKeyword } from "../../../models/review.model";

@Component({
  selector: 'app-keywords',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDividerModule],
  templateUrl: './keywords.component.html',
  styleUrl: './keywords.component.scss'
})
export class KeywordsComponent {
  reviewService = inject(ReviewService);
  dialog = inject(MatDialog);
  dialogRef: MatDialogRef<KeywordFormComponent> | undefined;
  keywords = signal([] as InvestigationKeyword[]);
  @Input() reviewId!: string;
  @Input() investigationId!: string;

  ngOnInit() {
    this.reviewService.listInvestigationKeywords(this.reviewId, this.investigationId).subscribe({
      next: (keywords) => {
        console.log(keywords)
        this.keywords.set(keywords)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onNewKeyword() {
    this.dialogRef = this.dialog.open(KeywordFormComponent, {
      data: { mode: 'create', reviewId: this.reviewId, investigationId: this.investigationId }
    });
    this.dialogRef.afterClosed().subscribe({
      next: (keyword) => {
        this.keywords.update((keywords) => [...keywords, keyword]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
