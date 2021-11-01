import { Component } from '@angular/core';
import { NavHelperProvider } from './../../providers/ui/nav-helper';

/**
 * Generated class for the VitalittyFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'vitalitty-footer',
  templateUrl: 'vitalitty-footer.html',
})
export class VitalittyFooterComponent {

  text: string;

  constructor() {
    // console.log('Hello VitalittyFooterComponent Component');
    // this.text = 'Hello World';
  }

  // public goToPage(page: string) {
  //   if (!!page && !page.includes('http')) {
  //     this.navHelper.push(page);
  //   } else if (!!page) {
  //     this.navHelper.goToLink(page);
  //   }
  // }

}
