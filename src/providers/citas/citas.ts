import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alert, AlertController} from 'ionic-angular';
import { UtilsProvider } from '../../shared/utils';
import { allCitasCliente, citasClient } from './modules.citas';
// import { Item } from '../../models/item';

/*
  Generated class for the EvolucionesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CitasProvider {

  myAlert: Alert;

  constructor(public http: HttpClient,
    public alertCtrl: AlertController,
    public utils: UtilsProvider) {
  }

  getClientesCitas(item) {
    const url = 'https://qnw4290ez9.execute-api.eu-west-3.amazonaws.com/v1Prueba/citas/' + item.id_client
    let seq = this.http.get(url).share();
    seq.subscribe((res: allCitasCliente) => {
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

  postClientesCitas(bodyPost) {
    console.log(bodyPost)
    let bodyCita :citasClient = {
        id_cita:3,
        id_cliente: bodyPost[0],
        id_dieta: 0,
        notas_cita: bodyPost[3],
        fecha_cita: bodyPost[1],
        cita_con_dieta: ''
    }

    let arrCita = [];
    arrCita.push(bodyCita)
    const url = 'https://qnw4290ez9.execute-api.eu-west-3.amazonaws.com/v1Prueba/citas/' + bodyPost[0]
    let seq = this.http.post(url, arrCita).share();
    seq.subscribe((res: allCitasCliente) => {
      if (res) {
        return res;
      }
    }, err => {
      console.error('ERROR', err);
      this.myAlert = this.utils.createBasicAlert('Error al crear la cita', 'Intentelo más tarde');
      this.myAlert.present();
      return err;
    });
    return seq;
  }

}
