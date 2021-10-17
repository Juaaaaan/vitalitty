import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { StorageKeys } from './../../providers/storage/storage.keys';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: StorageProvider,
    private viewCtrl: ViewController) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad DashboardPage');
  //   console.log(this.storage.get(StorageKeys.USER_INFO));
  // }

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
