import { Pipe, PipeTransform } from '@angular/core';
import { InvestigationStatus } from "../models/review.model";

@Pipe({
  name: 'investigationStatus',
  standalone: true
})
export class InvestigationStatusPipe implements PipeTransform {
  transform(value: InvestigationStatus, ...args: any[]): any {
    switch (value) {
      case InvestigationStatus.InProgress:
        return 'In Progress';
      case InvestigationStatus.Proceed:
        return 'Proceed';
      case InvestigationStatus.DoNotProceed:
        return 'Do Not Proceed';
      case InvestigationStatus.Proceed:
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  }
}
