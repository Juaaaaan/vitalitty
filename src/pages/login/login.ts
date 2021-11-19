import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {
    name: 'admin',
    pw: 'admin'
  };

  constructor(public navCtrl: NavController, 
    private authProvider: AuthProvider,
    private alertCtrl: AlertController) {
  }

  loginUser() {
    this.authProvider.login(this.user.name, this.user.pw).then(success => {
      if (success) {
        this.navCtrl.setRoot('MenuPage');
      }
    }).catch(err => {
      const alert =  this.alertCtrl.create({
        title: 'login failed',
        message: 'check your credentials',
        buttons: ['OK']
      });
        alert.present();
    })
  }

}
