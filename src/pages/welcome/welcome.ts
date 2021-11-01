import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { TranslateService } from '@ngx-translate/core';
import { FormHelperProvider } from './../../providers/form-helper/form-helper';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PATTERNS } from '../../providers/validators/validators.patterns';
import { StorageKeys } from './../../providers/storage/storage.keys';
import { LoginServiceModel } from '../../providers/auth/auth.model';
import { AuthServiceParser } from '../../providers/auth/auth.parser';
import { KeyValueModel } from '../../providers/ui/ui.models';


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
  public passwordIconName: string = 'eye';
  public clickedEye: boolean = false;
  public countError: number = 0;

   // Form Var
   public loginForm: FormGroup;
   public recoverForm: FormGroup;


   // Control Vars
   private loginFormErrors = new Map<string, KeyValueModel[]>();
   private recoverFormErrors = new Map<string, KeyValueModel[]>();
  //  private currentErrors = new Map<string, string>();
   public maxLength: number = 256;
   public nifLength: number = 9;
   public isLockedAccount: boolean = false;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translate: TranslateService,
    public formHelper: FormHelperProvider,
    public storage: Storage,
    public auth: AuthServiceParser) {


      this.loginFormErrors.set('email', [{ key: 'required', value: 'LOGIN.USER.NIF.ERROR' }, { key: 'pattern', value: 'LOGIN.USER.NIF.ERROR.PATTERN' }, { key: 'maxlength', value: 'LOGIN.USER.NIF.ERROR.PATTERN' }]);
      this.loginFormErrors.set('password', [{ key: 'required', value: 'LOGIN.USER.PASSWORD.ERROR' }, { key: 'pattern', value: 'LOGIN.USER.PASSWORD.ERROR.PATTERN' }, { key: 'maxlength', value: 'LOGIN.USER.MAX_LENGTH' }]);
      this.recoverFormErrors.set('email', [{ key: 'required', value: 'LOGIN.USER.NIF.ERROR' }, { key: 'pattern', value: 'LOGIN.USER.NIF.ERROR.PATTERN' }, { key: 'maxlength', value: 'LOGIN.USER.NIF.ERROR.PATTERN' }]);


     }

     ngOnInit() {
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern(PATTERNS.PATTERN_EMAIL)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(this.maxLength)]),
      });
      this.recoverForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern(PATTERNS.PATTERN_EMAIL)]),
      });
     }

  public goToPage(page:string) {
    this.navCtrl.push(page);
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
    if (this.loginForm.valid) {
      const bodyAccount = this.auth.parserAdmin(this.loginForm.value);
      const response = await this.user.login(bodyAccount).catch(err => console.log(err)) || null;
      if (response && response.status === 'OK') {
        if (response.body) {
          this.storage.set(response.body.isAdmin, StorageKeys.USER_INFO);
          this.navCtrl.push('DashboardPage');
        }
      } else {
        if (this.countError === 3) {
          this.goBack(response);
        } else {
          this.countError++ ;
          let toast = this.toastCtrl.create({
            message: response.status_code === 'LGN_001' ? this.translate.instant('LOGIN_ERROR_001') : this.translate.instant('LOGIN_ERROR'),
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      }
    }
  }

  public passwordForgotten() {
    let toast = this.toastCtrl.create({
      message: 'Se ha enviado un enlace para recuperar la contraseña al email que nos has indicado',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    setTimeout(() => {
      this.isLockedAccount = false;
    }, 3000);
    // setTimeout(() => {
    //   this.navCtrl.push('RecoverPasswordPage');
    //   this.isLockedAccount = false;
    // }, 500);
  }

  private goBack(errorResponse) {
    this.isLockedAccount = true;
    let toast = this.toastCtrl.create({
      message: errorResponse.status_code === 'LGN_001' ? this.translate.instant('LOGIN_ERROR_002') : this.translate.instant('LOGIN_ERROR'),
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    this.countError = 0;
  }

  signup() {
    // this.navCtrl.push('SignupPage');
    this.navCtrl.push('TutorialPage');
  }
}
