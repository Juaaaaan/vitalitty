import { Pipe, PipeTransform, Injectable } from '@angular/core';
import moment from 'moment';


@Pipe({
  name: 'customDate',
})
@Injectable()
export class CustomDatePipe implements PipeTransform {

  private defaultFormat = 'DD/MM/YYYY';


  transform(value: string, dateFormat?: string) {
    const date = new Date(value);
    return date ? moment(date).format(dateFormat ? dateFormat : this.defaultFormat) : value;
  }
}
