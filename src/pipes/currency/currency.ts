import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { CurrencyService } from './currency.service';

/**
 * Generated class for the CurrencyPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'currency',
})
@Injectable()
export class CurrencyPipe implements PipeTransform {

  constructor(private currencies: CurrencyService) { }

  transform(value: string, field: string) {

    return new Promise(
      (resolve) => {
        this.currencies.getCurrenciesDict().then(currencies => {
          if (currencies[value]) {
            resolve(currencies[value][field ? field : 'symbol']);
          } else {
            resolve(value);
          }
        });
      }
    );
  }
}
