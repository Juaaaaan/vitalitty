import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Api } from '../api/api';
import { LoginPost, LoginResponseModel, LoginServiceModel } from '../auth/auth.model';
import { clientData, registerPostUser, registerUser, responseRegisterUser } from './modules.user';
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




    // getPreCallGoogle () {
    //   const url = 'https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/verifiedaccess&client_id=1071430120392-el307509tli06fkutvitosopushhe5bc.apps.googleusercontent.com&redirect_uri=https://oauth.pstmn.io/v1/callback';
    //   const client_id = '1071430120392-el307509tli06fkutvitosopushhe5bc.apps.googleusercontent.com';
    //   const secret_id = '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';

    //   return new Promise<any>(
    //     (resolve,reject) =>  {
    //       this.http.get(url, httpOptions).subscribe(
    //         (response: any) => resolve(response),
    //         (error) => reject(error)
    //       );
    //     }
    //   )

    // }

    getCalendar(url: string) {      
      const httpOptions = {
        headers: new HttpHeaders({
            'host': 'www.googleapis.com',
            'Authorization': 'Bearer ya29.a0ARrdaM84PKi9g42Kb8n7R6rJr58Y5Dv8DGyHMYGVXG_C9pAQ3BCNQLbyyj39CEMOWEZJrUtv5tV-qrGuwh0smGdaAx9U6UEaJzPS1hMnY01HKbKPIRmmiqnq-cP1WWPcDpj2Xnr7Y6-kY-aO9-Ot10vDHnkk',
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json',
            'Accept': 'application/json'
        })
    };


      return new Promise<any>(
        (resolve,reject) =>  {
          this.http.get(url, httpOptions).subscribe(
            (response: any) => resolve(response),
            (error) => reject(error)
          );
        }
      )
    }

  login(accountInfoLogin: LoginServiceModel) {
    const useMock: boolean = false;
    return new Promise<any>(
      (resolve, reject) => {
        if (useMock) {
          if (accountInfoLogin.email === 'admin@vitalitty.com' && accountInfoLogin.password === 'Pass1234%') {
            this.http.get('assets/mocks/login.json').subscribe(
              (response: LoginResponseModel) => resolve(response),
              (error) => reject(error)
            );
          } else if (accountInfoLogin.email === 'client@vitalitty.com' && accountInfoLogin.password === 'Pass1234%') {
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
        } else {
          let bodyLogin = this.parseBodyLogin(accountInfoLogin);
          this.http.post('https://qnw4290ez9.execute-api.eu-west-3.amazonaws.com/v1Prueba/usuarios/login', bodyLogin).subscribe(
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


  createEventCalendarUser(allEventInfo) {
    let bodyAccount = this.parseAccountInfo(allEventInfo);
    let seq = this.http.post('https://www.googleapis.com/calendar/v3/calendars/juan11857@gmail.com/events', bodyAccount).share();
    seq.subscribe((res: any) => {
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

  getInfo() {
    let seq = this.http.get('https://qnw4290ez9.execute-api.eu-west-3.amazonaws.com/v1Prueba/clientes').share();
    seq.subscribe((res: clientData) => {
      if (res) {
        return res;
      }
    }, err => {
      console.error('ERROR', err);
      this.myAlert = this.utils.createBasicAlert('Error al recuperar los datos', 'No ha sido imposible recuperar toda tu información. Intentelo más tarde');
      this.myAlert.present();
      return err;
    });
    return seq;
  }

  parseAccountInfo(account: registerUser) {
    console.log(account);
    let accountpost: registerPostUser = {
      body: {
        name: account.name,
        surname: account.surname,
        email: account.email,
        gender: account.gender,
        password: btoa(account.password),
        tel: account.tel,
        accept: account.accept,
        observations: account.observations,
        rol: 'cliente'
      }
    }
    return accountpost;
  }

  parseBodyLogin(account: LoginServiceModel) {
    let accountlogin: LoginPost = {
      body: {
        email: account.email,
        password: btoa(account.password)
      }
    }
    return accountlogin;
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
