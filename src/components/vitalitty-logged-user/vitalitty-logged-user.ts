import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { UserHeaderViewModel } from './viewModel';

/**
 * Generated class for the VitalittyLoggedUserComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

export interface HeaderOption {
  id: any;
  name: string;
  page?: string;
  link?: string;
}

@Component({
  selector: 'vitalitty-logged-user',
  templateUrl: 'vitalitty-logged-user.html'
})
export class VitalittyLoggedUserComponent implements OnInit {

  public isOpen: boolean = false;
  @Input() userData: UserHeaderViewModel;
  @Input() options: HeaderOption[];
  @Output() onClickItem: EventEmitter<HeaderOption> = new EventEmitter<HeaderOption>();
  text: string;

  constructor() {
    console.log('Hello VitalittyLoggedUserComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
  }

  showMenu() {
    this.isOpen = !this.isOpen;
  }

  clickedOption(option: HeaderOption) {
    this.onClickItem.emit(option);
  }

}
