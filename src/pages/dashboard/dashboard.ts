import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar/ngx';
import { StorageProvider } from '../../providers/storage/storage';
// import { StorageKeys } from './../../providers/storage/storage.keys';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [
    StorageProvider
  ]
})
export class DashboardPage {

  // Variables
  public calendars = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    // private storage: StorageProvider,
    private viewCtrl: ViewController,
    private calendar: Calendar
    // private plt: Platform
    ) {

      // this.plt.ready().then(() => {
      //   this.calendar.listCalendars().then(data => {
      //     this.calendar = data;
      //   }).catch(error => console.log(error));
      // });

  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad DashboardPage');
  //   console.log(this.storage.get(StorageKeys.USER_INFO));
  // }

  // ngOnInit() : void {
  //   this.calendar.createCalendar('MyCalendar').then(
  //     (msg) => { console.log(msg); },
  //     (err) => { console.log(err); }
  //   );
  // }

  public addEvent(cal) {
    let date = new Date();
    let options = {calendarId: cal.id, calendarName: cal.name, url: 'https://ionicacademy.com', firstReminderMinutes: 15};

    this.calendar.createEventInteractivelyWithOptions('My new event', 'España', 'Some special notes', date, date, options).then(() => {
      console.log('flag');
    });
  }

  public openCal(cal) {
    this.navCtrl.push('AppointmentDetailPage', {name: cal.name});
  }


  public goToPage(page: string) {
    this.navCtrl.push(page);
  }

  public closeApp(page: string) {
    // window.localStorage.clear();
    this.navCtrl.push(page).then(() => {
      const index = this.viewCtrl.index;
      this.navCtrl.remove(index);
    })
  }

}
