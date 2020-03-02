import { Component } from '@angular/core';

/**
 * Generated class for the WritterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'writter',
  templateUrl: 'writter.html'
})
export class WritterComponent {

  text: string;

  constructor() {
    console.log('Hello WritterComponent Component');
    this.text = 'Hello World';
  }

}
