import { Pipe, PipeTransform } from '@angular/core';
import { ReviewType } from "../models/review.model";

@Pipe({
  name: 'reviewType',
  standalone: true
})
export class ReviewTypePipe implements PipeTransform {

  transform(value: ReviewType, ...args: any[]): any {
    switch (value) {
      case ReviewType.SystematicReview:
        return 'Systematic Review';
      case ReviewType.ScopingReview:
        return 'Scoping Review';
      case ReviewType.RapidReview:
        return 'Rapid Review';
      default:
        return 'Unknown';
    }
  }

}
