import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the HeaderLogoutComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-logout',
  templateUrl: 'header-logout.html'
})
export class HeaderLogoutComponent {

  text: string;

  constructor(private navCtrl: NavController) {
    console.log('Hello HeaderLogoutComponent Component');
    this.text = 'Hello World';
  }

  public login() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'backward'
    });
  }

}
