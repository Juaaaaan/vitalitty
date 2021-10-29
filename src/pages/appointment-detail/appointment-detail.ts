import { Component } from '@angular/core';
import { Calendar } from '@ionic-native/calendar';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

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
export class AppointmentDetailPage {

  //variables
  public calName: string = '';
  public events = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private calendar: Calendar,
    private plt: Platform) {
      this.calName = this.navParams.get('name');
      // PLT PORQUE TIENE DIFERENTES FUNCIONES EN iOS RESPECTO A ANDROID

      if (this.plt.is('ios')){
        // console.log('ios');
        this.calendar.findAllEventsInNamedCalendar(this.calName).then(data => {
          this.events = data;
        })
      } else if (this.plt.is('android')){
        // console.log('android');
        let start = new Date();
        let end = new Date();
        end.setDate(end.getDate() + 31);
        this.calendar.listEventsInRange(start, end).then(data => {
          this.events = data;
        })
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentDetailPage');
  }

}
