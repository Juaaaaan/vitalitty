import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CurrencyService {

  private currenciesDict: any;

  constructor(private http: HttpClient) {

  }


  getCurrenciesDict() {
    return new Promise(
      (resolve) => {
        if (this.currenciesDict) {
          resolve(this.currenciesDict);
        } else {
          this.http.get('./assets/others/currencies.json').subscribe(currencies => {
            this.currenciesDict = currencies;
            resolve(currencies);
          });
        }
      }
    );
  }
}
