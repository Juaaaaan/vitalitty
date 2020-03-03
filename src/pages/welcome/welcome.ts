import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { TranslateService } from '@ngx-translate/core';
import { MainPage } from '../';


/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };


  // UI Vars
  isLogin: boolean = false;
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

      this.translateService.get('LOGIN_ERROR').subscribe((value) => {
        this.loginErrorString = value;
      });
     }

  public goToPage(page:string) {
    switch (page) {
      case 'signup':
        this.navCtrl.push('SignupPage');
        break;
      case 'tutorial':
        this.navCtrl.push('TutorialPage');
      default:
        break;
    }
  }

  login() {
    this.isLogin = true;
    // this.doLogin();
    this.navCtrl.push('LoginPage');
  }

  // doLogin() {
  //   this.user.login(this.account).subscribe((resp) => {
  //     if (resp) {
  //       this.navCtrl.push(MainPage);
  //     }
  //   }, (err) => {
  //     this.navCtrl.push(MainPage);
  //     // Unable to log in
  //     let toast = this.toastCtrl.create({
  //       message: this.loginErrorString,
  //       duration: 3000,
  //       position: 'top'
  //     });
  //     toast.present();
  //   });
  // }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
