import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alert, AlertController } from 'ionic-angular';
import { UtilsProvider } from '../../shared/utils';
import { dietasClient } from '../citas/modules.citas';

/*
  Generated class for the DietasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DietasProvider {

  myAlert: Alert;

  constructor(public http: HttpClient,
    public alertCtrl: AlertController,
    public utils: UtilsProvider) {
    console.log('Hello DietasProvider Provider');
  }


  getClientDietas(id_client) {
    const url = 'https://qnw4290ez9.execute-api.eu-west-3.amazonaws.com/v1Prueba/dietas/cliente/' + id_client;
    let seq = this.http.get(url).share();
    seq.subscribe((res: dietasClient) => {
      if (res) {
        return res;
      }
    }, err => {
      console.error('ERROR', err);
      this.myAlert = this.utils.createBasicAlert('Error al recuperar los datos', 'No hemos podido recuperar la información del usuario. Intentelo más tarde');
      this.myAlert.present();
      return err;
    });
    return seq;
  }

}
