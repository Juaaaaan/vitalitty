import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar/ngx';
import { StorageProvider } from '../../providers/storage/storage';
import { Chart } from 'chart.js';
// import { Utils }
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

  // Obtenga el elemento dom del lienzo correspondiente
	@ViewChild('pieCanvas') pieCanvas;
	
  // Crear un nuevo objeto para inicializar
 pieChart: any;

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

  ngAfterViewInit() {
    // Inicializa el gráfico
     setTimeout(() => {
       this.pieChart = this.getPieChart();
     }, 350);
  }

  // https://www.chartjs.org/docs/latest/samples/other-charts/doughnut.html PARA CREAR GRÁFICOS
  getChart(context, chartType, data, options?) {
    return new Chart(context, {
      data,
      options,
      type: chartType,
    });
  }

  getPieChart() {
    const DATA_COUNT = 5;
    const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

    const data = {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          // data: Utils.numbers(NUMBER_CFG),
          // backgroundColor: Object.values(Utils.CHART_COLORS),
        }]
    };

    return this.getChart(this.pieCanvas.nativeElement, 'doughnut', data);
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
