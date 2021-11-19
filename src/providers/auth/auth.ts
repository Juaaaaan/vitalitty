
import { Injectable } from '@angular/core';


export interface user {
  name: string;
  role: number;
}

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  currentUser: user;

  constructor() {
  }

  login(name: string, pw: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (name === 'admin' && pw === 'admin') {
        this.currentUser = {
          name: name,
          role: 0
        }
        resolve(true); 
      } else if (name === 'user' && pw === 'user') {
        this.currentUser = {
          name: name,
          role: 1
        }
        resolve(true); 
      } else {
        reject(false);
      }
    })

  }

  isLoggedIn() {
    return this.currentUser != null;
  }


  logout() {
    return this.currentUser = null;
  }

  isAdmin() {
    return this.currentUser.role === 0;
  }

}
 