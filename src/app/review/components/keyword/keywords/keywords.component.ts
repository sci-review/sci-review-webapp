import { Component, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { KeywordFormComponent } from "../keyword-form/keyword-form.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { ReviewService } from "../../../services/review.service";
import { InvestigationKeyword } from "../../../models/review.model";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-keywords',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDividerModule, MatIconModule],
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
      data: { reviewId: this.reviewId, investigationId: this.investigationId, keyword: null }
    });
    this.dialogRef.afterClosed().subscribe({
      next: (keyword) => {
        if (!keyword) return;
        this.keywords.update((keywords) => [...keywords, keyword]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onDeleteKeyword(keyword: InvestigationKeyword) {
    this.reviewService.deleteInvestigationKeyword(this.reviewId, this.investigationId, keyword.id).subscribe({
      next: () => {
        this.keywords.update((keywords) => keywords.filter((key) => key.id !== keyword.id));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onEditKeyword(keyword: InvestigationKeyword) {
    this.dialogRef = this.dialog.open(KeywordFormComponent, {
      data: { reviewId: this.reviewId, investigationId: this.investigationId, keyword: keyword }
    });
    this.dialogRef.afterClosed().subscribe({
      next: (keyword) => {
        if (!keyword) return;

        const index = this.keywords().findIndex((key) => key.id === keyword.id);
        if (index !== -1) {
          this.keywords.update((keywords) => [...keywords.slice(0, index), keyword, ...keywords.slice(index + 1)])
          return;
        }
        this.keywords.update((keywords) => [...keywords, keyword]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
