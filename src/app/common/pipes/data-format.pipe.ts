import { Pipe, PipeTransform } from '@angular/core';
import moment from "moment/moment";

@Pipe({
  name: 'dataFormat',
  standalone: true
})
export class DataFormatPipe implements PipeTransform {

  transform(value: moment.Moment, ...args: any[]): any {
    let [format] = args;
    return moment(value).format(format);
  }

}
