import { Component, Injector, OnInit } from '@angular/core';
import { ViewController, NavParams, AlertButton } from 'ionic-angular';
import { AlertModel } from '../../providers/ui/alert';
import { DynamicFormConfig } from '../../providers/ui/ui.models';
import { KeyValueModel } from '../../providers/ui/ui.models';



/**
 * Generated class for the VitalityAlertComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'vitality-alert',
  templateUrl: 'vitality-alert.html'
})
export class VitalityAlertComponent implements OnInit {

  // UI Vars
  public alertInfo: AlertModel;
  public alertButtons: AlertButton;
  public action: string;


  // Form Vars
  public formConfig: DynamicFormConfig[];
  public formErrors = new Map<string, KeyValueModel[]>();

  constructor(private viewCtrl: ViewController,
    public navParams: NavParams,
    public injector: Injector) {

    this.alertInfo = navParams.get('data');
    this.alertButtons = navParams.get('buttons');

    this.formConfig = navParams.get('formConfig');
    this.formErrors = navParams.get('formErrors');
    this.action = navParams.get('action');

  }

  ngOnInit() {
    if (this.action) {
      this.action = this.action.toUpperCase();
    }
  }

  goToPage(page: string) {
    if (page) {
    this.viewCtrl.dismiss();
    }
  }

  // *******************************************
  // UI Methods
  // *******************************************
  public closeModal() {
    this.viewCtrl.dismiss();
  }

  public alertButtonClicked(button: AlertButton) {
    if (button.handler) {
      button.handler(true);
    }
    this.viewCtrl.dismiss();
  }

  public sendForm() {
    this.viewCtrl.dismiss(this.action);
  }

}
