import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../api/api';
import { LoginResponseModel, LoginServiceModel } from '../auth/auth.model';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public api: Api,
    public http: HttpClient) { }

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
          } else {
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
  signup(accountInfo: any) {
    console.log('flag');
    let seq = this.http.get('../../assets/mocks/register.json', accountInfo).share();
    // let seq = this.http.post('../../assets/mocks/register.json', accountInfo).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'OK') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
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
