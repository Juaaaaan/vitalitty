import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormHelperProvider } from './../../providers/form-helper/form-helper';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PATTERNS } from '../../providers/validators/validators.patterns';

/**
 * Generated class for the RecoverPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recover-password',
  templateUrl: 'recover-password.html',
  providers: [
    FormHelperProvider,
  ]
})
export class RecoverPasswordPage implements OnInit {

    // Form Var
    public recoverPassForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ngOnInit() {
    this.recoverPassForm = new FormGroup({
      email: new FormControl('', Validators.required),

    });
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecoverPasswordPage');
  }

  public doRecoverPass() {
    console.log('flag');
  }

}
