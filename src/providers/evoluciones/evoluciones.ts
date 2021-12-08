import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alert, AlertController} from 'ionic-angular';
import { UtilsProvider } from '../../shared/utils';
import { allEvolucionCliente } from './modules.evoluciones';
// import { Item } from '../../models/item';

/*
  Generated class for the EvolucionesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EvolucionesProvider {

  myAlert: Alert;

  constructor(public http: HttpClient,
    public alertCtrl: AlertController,
    public utils: UtilsProvider) {
  }

  getClientEvolucion(item) {
    const url = 'https://qnw4290ez9.execute-api.eu-west-3.amazonaws.com/v1Prueba/clientes/' + item.id_client
    let seq = this.http.get(url).share();
    seq.subscribe((res: allEvolucionCliente) => {
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
