import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, email: string, gender: string, password: string, confirmPassword: string, weight: number | string, tall: number | string } = {
    name: '',
    email: '',
    gender: '',
    password: '',
    confirmPassword: '',
    weight: '',
    tall: ''
  };

  // Our translated text strings
  public signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translate: TranslateService) {

    this.translate.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      console.log(err, 'FKAG');
      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: err === 'LGN_001' ? this.translate.instant('LOGIN_ERROR_001') : this.translate.instant('LOGIN_ERROR'),
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }

  public login() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'backward'
    });
  }
}
