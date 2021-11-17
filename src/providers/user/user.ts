import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../api/api';
import { LoginResponseModel, LoginServiceModel } from '../auth/auth.model';
import { registerPostUser, registerUser, responseRegisterUser } from './modules.user';
import { Alert, AlertController } from 'ionic-angular';
import { UtilsProvider } from '../../shared/utils';

@Injectable()
export class User {
  _user: any;

  myAlert: Alert;

  constructor(public api: Api,
    public http: HttpClient,
    public alertCtrl: AlertController,
    public utils: UtilsProvider) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  // login(accountInfo: any) {
  //   let seq = this.api.post('login', accountInfo).share();

  //   seq.subscribe((res: any) => {
  //     // If the API returned a successful response, mark the user as logged in
  //     if (res.status == 'success') {
  //       this._loggedIn(res);
  //     } else {
  //     }
  //   }, err => {
  //     console.error('ERROR', err);
  //   });

  //   return seq;
  // }

  login(accountInfo: LoginServiceModel) {
    const useMock: boolean = true;
    return new Promise<any>(
      (resolve, reject) => {
        if (useMock) {
          if (accountInfo.email === 'admin@vitalitty.com' && accountInfo.password === 'Pass1234%') {
            this.http.get('assets/mocks/login.json').subscribe(
              (response: LoginResponseModel) => resolve(response),
              (error) => reject(error)
            );
          } else if (accountInfo.email === 'client@vitalitty.com' && accountInfo.password === 'Pass1234%') {
            this.http.get('assets/mocks/login_client.json').subscribe(
              (response: LoginResponseModel) => resolve(response),
              (error) => reject(error)
            );
          }
          else {
            this.http.get('assets/mocks/login_KO.json').subscribe(
              (response: LoginResponseModel) => resolve(response),
              (error) => reject(error)
            );
          }
          // let seq = this.api.post('login', accountInfo).subscribe(
          //   (response: any) => resolve(response),
          //   (error) => reject(error)
          // );
        } else {
          this.http.post('www.google.es', accountInfo).subscribe(
            (response: any) => resolve(response),
            (error) => reject(error)
          );
        }
      }
    );
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: registerUser) {
    let bodyAccount = this.parseAccountInfo(accountInfo);
    console.log(bodyAccount);
    let seq = this.http.post('https://qnw4290ez9.execute-api.eu-west-3.amazonaws.com/v1Prueba/usuarios/register', bodyAccount).share();
    seq.subscribe((res: responseRegisterUser) => {
      if (res.status == 'OK') {
        console.log('flag');
      }
    }, err => {
      console.error('ERROR', err);
      this.myAlert = this.utils.createBasicAlert('Error en el registro', 'Puedes intentarlo dentro de unos minutos');
      this.myAlert.present();

    });

    return seq;
  }

  parseAccountInfo(account: registerUser) {
    let accountpost: registerPostUser = {
      body: {
        name: account.name,
        surname: account.surname,
        email: account.email,
        gender: account.gender,
        password: btoa(account.password),
        tel: account.tel,
        accept: account.accept,
        rol: 'cliente'
      }
    }
    return accountpost;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}
