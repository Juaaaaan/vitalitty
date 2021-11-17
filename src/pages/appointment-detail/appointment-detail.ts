import { Component, OnInit } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AppointmentDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appointment-detail',
  templateUrl: 'appointment-detail.html',
})
export class AppointmentDetailPage implements OnInit {

  public events = [];

  viewDate: Date = new Date();
  view = 'week';
  locale = 'es';
  isDragging = false;


  // refresh = new Subject<any> = new Subject

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentDetailPage');
  }


  ngOnInit(): void {
  }

  menuDesplegable() {
    this.menuCtrl.toggle()
  }

}
