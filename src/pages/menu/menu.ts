import { Component, ViewChild } from '@angular/core';
import { App, IonicPage, Nav, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  username: string = '';
  pages = [];


  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController,
    private auth: AuthProvider, 
    private appCtrl: App) {
  }

  ionViewWillEnter(){
    if (this.auth.isAdmin()) {
      this.pages = [
        { title: 'Admin Dashboard', page: 'AdminPage', icon: 'home'},
        { title: 'Admin Second Page', page: 'AdminSecondPage', icon: 'planet'},
      ];
      this.openPage('AdminPage');
    } else {
      this.pages = [
        { title: 'User Dashboard', page: 'UserPage', icon: 'home'},
        { title: 'User Second Page', page: 'UserSecondPage', icon: 'planet'},
      ];
      this.openPage('UserPage'); 
    }
    this.username = this.auth.currentUser.name;
  }

  openPage(page) {
    this.nav.setRoot(page);
  }

  logout() {
    this.auth.logout();
    // this.nav.setRoot('LoginPage'); // Wrong
    this.appCtrl.getRootNav().setRoot('LoginPage'); // Right
  }


  ionViewCanEnter(){
    this.auth.isLoggedIn();
  }

}
