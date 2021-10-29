import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, email: string, gender: string, password: string, confirmPassword: string, observations: string } = {
    name: '',
    email: '',
    gender: '',
    password: '',
    confirmPassword: '',
    observations: ''
  };

  // Our translated text strings
  public signupErrorString: string;
  public recoverForm: FormGroup;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translate: TranslateService,
    private formBuilder: FormBuilder) {

    this.translate.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    });
  }

  ngOnInit() {
    this.recoverForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      observations: new FormControl('', [Validators.required]),
    });
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
    if (resp) {
      let toast = this.toastCtrl.create({
        message: this.translate.instant('REGISTER_OK'),
        duration: 5000,
        position: 'bottom'
      });
      toast.present();
      setTimeout(() => {
        this.login();
      }, 5500);
    }
    }, (err) => {
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
