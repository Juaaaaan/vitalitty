import { KeyValueModel } from './ui.models';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, AlertButton, Platform, ModalController, Modal, Alert } from 'ionic-angular';
import { AcieAlertComponent } from '../../components/acie/acie-alert/acie-alert';

export interface AlertModel {
  title: string;
  message?: string;
  messagesArray?: any;
  message_forgot?: string;
  message_forgot_2?: string;
  body?: any;
  img?: any;
  button?: any;
}



@Injectable()
export class AlertHelperProvider {

  // Communicate Vars
  private alertBehaviour = new BehaviorSubject<AlertModel>(<AlertModel>{});


  //  UI Vars
  private modalInstance: Modal;
  private alertInstance: Alert;



  // Data Vars
  private buttons: AlertButton[] = [];
  private defaultButton: AlertButton = { text: 'ALERT_BUTTONS.DEFAULT' };


  // Control Vars
  private isWeb: boolean = false;
  private isIE: boolean = false;
  private isEdge: boolean = false;





  constructor(private alertCtrl: AlertController, private modalCtrl: ModalController, private translate: TranslateService, private platform: Platform) {
    this.initialize();
  }


  private initialize() {
    this.platform.ready().then(() => this.isWeb = !this.platform.is('cordova'));
    this.isIE = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    this.isEdge = window.navigator.userAgent.includes('Edge');

    this.alertBehaviour.subscribe(
      (value: AlertModel) => {
        if (!!value && value.title) {
          this.createAlert(value);
        }
      }
    );
  }





  // *******************************************
  // UI Methods
  // *******************************************
  private createAlert(alertModel: AlertModel) {
    if (this.isWeb) {

      this.modalInstance = this.modalCtrl.create(AcieAlertComponent, { data: alertModel, buttons: this.translateButtons() }, { cssClass: 'acie-alert linear-x center-xy ' + ((this.isIE && !this.isEdge) ? 'ie' : ''), enableBackdropDismiss: false });

      this.modalInstance.onDidDismiss(() => this.buttons = []);
      this.modalInstance.present();
    } else {
      this.alertInstance = this.alertCtrl.create({
        title: alertModel.title,
        message: alertModel.message,
        buttons: this.translateButtons()
      });

      this.alertInstance.onDidDismiss(() => this.buttons = []);
      this.alertInstance.present();
    }
  }






  // *******************************************
  // PARSE Methods
  // *******************************************
  private translateButtons(): AlertButton[] {
    let buttons: AlertButton[] = [];
    const translatedButtons: AlertButton[] = [];

    this.buttons.length !== 0 ? buttons = this.buttons : buttons.push(this.defaultButton);
    buttons.forEach(b => translatedButtons.push({ text: this.translate.instant(b.text), handler: b.handler, role: b.role }));

    return translatedButtons;
  }





  // *******************************************
  // GETTERS / SETTERS Methods
  // *******************************************
  public showAlert(alert: AlertModel) {
    alert.title = this.translate.instant(alert.title);
    alert.message = this.translate.instant(alert.message);
    if (!!alert.message_forgot) {
      alert.message_forgot = this.translate.instant(alert.message_forgot);
      alert.message_forgot_2 = this.translate.instant(alert.message_forgot_2);
    }
    this.alertBehaviour.next(alert);
  }


  public dismissAlert() {
    this.isWeb ? this.modalInstance.dismiss() : this.alertInstance.dismiss();
    this.modalInstance = null;
    this.alertInstance = null;
  }


  public addButton(button: AlertButton) {
    this.buttons.push(button);
  }


  public clearButtons() {
    this.buttons = [];
  }
}
