import { Component, Inject, inject, Input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatErrorsComponent } from "../../../../common/components/mat-errors/mat-errors.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ReviewService } from "../../../services/review.service";
import { InvestigationKeyword, KeywordForm } from "../../../models/review.model";
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from "@angular/material/chips";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";

export interface Synonym {
  text: string;
}


@Component({
  selector: 'app-keyword-form',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatErrorsComponent, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, MatChipsModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './keyword-form.component.html',
  styleUrl: './keyword-form.component.scss'
})
export class KeywordFormComponent {
  reviewService = inject(ReviewService)
  loading = false;
  form: FormGroup;
  announcer = inject(LiveAnnouncer);
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  synonyms: Synonym[] = [];

  constructor(
    public dialogRef: MatDialogRef<KeywordFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string, reviewId: string, investigationId: string}
  ) {
    this.form = new FormGroup({
      word: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255),]),
    })
  }

  get word() {
    return <FormControl<any>> this.form.get('word')!!;
  }

  onSubmit() {
    console.log(this.form.value, this.synonyms);

    const investigationKeyword: KeywordForm = {
      word: this.form.value.word,
      synonyms: this.synonyms.map((synonym) => synonym.text)
    }

    this.loading = true;
    this.reviewService.newInvestigationKeyword(this.data.reviewId, this.data.investigationId, investigationKeyword)
      .subscribe({
        next: (investigationKeyword) => this.dialogRef.close(investigationKeyword),
        error: (error) => {
          console.error(error);
        }
      });
  }

  add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    if (value) {
      this.synonyms.push({text: value});
    }

    event.chipInput!.clear();
  }

  remove(synonym: Synonym): void {
    const index = this.synonyms.indexOf(synonym);

    if (index >= 0) {
      this.synonyms.splice(index, 1);

      this.announcer.announce(`Removed ${synonym}`);
    }
  }

  edit(synonym: Synonym, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(synonym);
      return;
    }

    const index = this.synonyms.indexOf(synonym);
    if (index >= 0) {
      this.synonyms[index].text = value;
    }
  }
}
