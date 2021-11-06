import { Injectable, Component } from '@angular/core';
import { ToastController, AlertController, ModalController, Alert, Toast, Modal, LoadingController, Platform } from 'ionic-angular';
import * as moment from 'moment';


@Injectable()
export class UtilsProvider {

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private platform: Platform
  ) {
  }

  // ***************************************************************************************
  // LOADER
  // ***************************************************************************************

  createBasicLoading() {
    let loader = this.loadingCtrl.create();
    return loader;
  }

  // ***************************************************************************************
  // ALERT
  // ***************************************************************************************

  createBasicAlert(title: string, subtitle: string, textButton?: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      enableBackdropDismiss: false,
      buttons: (textButton) ? [textButton] : ['OK']
    });
    return alert;
  }

  createConfirmAlert(title: string, message: string, textButtonOK: string, functionOK: any, textButtonCancel?: string, functionCancel?: any) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: textButtonCancel ? textButtonCancel : 'Cancel',
          role: 'cancel',
          handler: () => {
            if (functionCancel) functionCancel();
          }
        },
        {
          text: textButtonOK,
          handler: () => {
            functionOK();
          }
        }
      ]
    });
    return alert;
  }

  showAlert(alert: Alert) {
    alert.present();
  }


  // ***************************************************************************************
  // TOAST
  // ***************************************************************************************

  createToast(message: string, duration?: number, position?: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: (duration) ? duration : 3000,
      position: (position) ? position : 'top'
    });
    return toast;
  }

  showToast(toast: Toast) {
    toast.present();
  }

  // ***************************************************************************************
  // MODAL
  // ***************************************************************************************

  createModal(component: Component, params?: Object, cssClass?: string) {
    let modal: Modal;
    if (!cssClass) {
      modal = this.modalCtrl.create(component, params);
    } else {
      modal = this.modalCtrl.create(component, params, { cssClass: cssClass });
    }
    return modal;
  }

  showModal(modal: Modal) {
    modal.present();
  }

  // ***************************************************************************************
  // FORMAT DATE GMT+0
  // ****************************************************************************************

  formatDateGMT0(date: string): number {
    if (this.isSafari()) {
      return new Date(new Date(date).valueOf() + new Date(date).getTimezoneOffset() * 60000).getHours();
    } else {
      return new Date(date).getHours();
    }
  }

  getFullDateGMT0(date: string): Date {
    if (this.isSafari()) {
      return new Date(new Date(date).valueOf() + new Date(date).getTimezoneOffset() * 60000);
    } else {
      return new Date(date);
    }
  }

  formatTimeGMT0(date: string): string {
    if (this.isSafari()) {
      let dateAUX = new Date(new Date(date).valueOf() + new Date(date).getTimezoneOffset() * 60000);
      return moment(dateAUX).format('HH:mm');
    } else {
      return moment(date).format('HH:mm');
    }
  }

  isSafari() {
    return navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
      navigator.userAgent &&
      navigator.userAgent.indexOf('CriOS') == -1 &&
      navigator.userAgent.indexOf('FxiOS') == -1;
      
  }

  isSafariAndNotCordova(){
    return navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
      navigator.userAgent &&
      navigator.userAgent.indexOf('CriOS') == -1 &&
      navigator.userAgent.indexOf('FxiOS') == -1 && !(this.platform.is('cordova'))
  }

  isSafariAndCordova(){
    return navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
      navigator.userAgent &&
      navigator.userAgent.indexOf('CriOS') == -1 &&
      navigator.userAgent.indexOf('FxiOS') == -1 && (this.platform.is('cordova'))
  }

  detectIE() {
    var ua = window.navigator.userAgent;
    // console.log(ua);

    // Test values; Uncomment to check result …

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
  }

}
