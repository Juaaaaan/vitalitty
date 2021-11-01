import { NgModule } from '@angular/core';
import { CurrencyPipe } from './currency/currency';
import { CustomDatePipe } from './custom-date/custom-date';
import { CurrencyService } from './currency/currency.service';
import { SearcherPipe } from './searcher/searcher';
@NgModule({
  declarations: [
    CurrencyPipe,
    CustomDatePipe,
    SearcherPipe
  ],
  imports: [],
  exports: [
    CurrencyPipe,
    CustomDatePipe,
    SearcherPipe
  ],
  providers: [
    CurrencyService,
    CustomDatePipe
  ]
})
export class PipesModule { }
