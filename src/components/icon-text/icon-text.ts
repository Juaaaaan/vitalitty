import { Component, Input } from '@angular/core';

/**
 * Generated class for the IconTextComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'icon-text',
  templateUrl: 'icon-text.html'
})
export class IconTextComponent {

  text: string;

  @Input() position: string;

  constructor() {
    console.log('Hello IconTextComponent Component');
    this.text = 'Hello World';
  }

}
