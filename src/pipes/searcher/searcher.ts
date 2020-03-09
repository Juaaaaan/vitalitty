import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searcher',
})
export class SearcherPipe implements PipeTransform {

  transform(arrayToFilter: any[], pattern: string) {
    if (pattern) {
      const value: string = pattern.toLowerCase();
      return arrayToFilter.filter((obj) => Object.keys(obj).find(key => obj[key].toString().toLowerCase().includes(value)));
    } else {
      if (arrayToFilter) {
        return arrayToFilter;
      }
    }
  }
}
