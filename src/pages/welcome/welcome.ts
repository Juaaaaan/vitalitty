import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { TranslateService } from '@ngx-translate/core';
import { MainPage } from '../';
import { FormHelperProvider } from './../../providers/form-helper/form-helper';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PATTERNS } from '../../providers/validators/validators.patterns';
import { KeyValueModel } from '../../../../mapfre-acie/mapfre-acie/src/providers/ui/ui.models';
import { StorageKeys } from './../../providers/storage/storage.keys';
import { LoginServiceModel } from '../../providers/auth/auth.model';
import { AuthServiceParser } from '../../providers/auth/auth.parser';


/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
  providers: [
    FormHelperProvider,
    AuthServiceParser
  ]
})
export class WelcomePage implements OnInit {

  public account: LoginServiceModel;


  // UI Vars
  public isLogin: boolean = false;
  public passwordInputType: string = 'password';
  public passwordIconName: string = 'md-eye';

   // Form Var
   public loginForm: FormGroup;


   // Control Vars
   private loginFormErrors = new Map<string, KeyValueModel[]>();
  //  private currentErrors = new Map<string, string>();
   public maxLength: number = 256;
   public nifLength: number = 9;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translate: TranslateService,
    public formHelper: FormHelperProvider,
    public storage: Storage,
    public auth: AuthServiceParser) {


      this.loginFormErrors.set('email', [{ key: 'required', value: 'LOGIN.USER.NIF.ERROR' }, { key: 'pattern', value: 'LOGIN.USER.NIF.ERROR.PATTERN' }, { key: 'maxlength', value: 'LOGIN.USER.NIF.ERROR.PATTERN' }]);
      this.loginFormErrors.set('password', [{ key: 'required', value: 'LOGIN.USER.PASSWORD.ERROR' }, { key: 'pattern', value: 'LOGIN.USER.PASSWORD.ERROR.PATTERN' }, { key: 'maxlength', value: 'LOGIN.USER.MAX_LENGTH' }]);

     }

     ngOnInit() {
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern(PATTERNS.PATTERN_DNI), Validators.maxLength(this.nifLength)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(this.maxLength)]),
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

  showPassword() {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text';
      this.passwordIconName = 'md-eye-off';
    } else {
      this.passwordInputType = 'password';
      this.passwordIconName = 'md-eye';
    }
  }

  login(numberLog: boolean) {
    this.isLogin = numberLog;
  }

  async doLogin() {
    const bodyAccount = this.auth.parserAdmin(this.loginForm.value);
    const response = await this.user.login(bodyAccount).catch(err => console.log(err)) || null;
    if (response && response.status === 'OK') {
      if (response.body) {
        this.storage.set(response.body.isAdmin, StorageKeys.USER_INFO);
        this.navCtrl.push('DashboardPage');
      }
    } else {
      let toast = this.toastCtrl.create({
        message: response.status_code === 'LGN_001' ? this.translate.instant('LOGIN_ERROR_001') : this.translate.instant('LOGIN_ERROR'),
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

  signup() {
    // this.navCtrl.push('SignupPage');
    this.navCtrl.push('TutorialPage');
  }
}
