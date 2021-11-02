import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar/ngx';
import { StorageProvider } from '../../providers/storage/storage';
import { Chart } from 'chart.js';
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
  public newDate = new Date();

  // Obtenga el elemento dom del lienzo correspondiente
	@ViewChild('pieCanvas') pieCanvas;
  @ViewChild('barCanvas') barCanvas;
	
  // Crear un nuevo objeto para inicializar
 pieChart: any;
 barChart: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    // private storage: StorageProvider,
    private viewCtrl: ViewController
    ) {

  }

  ngAfterViewInit() {
    // Inicializa el gráfico
     setTimeout(() => {
       this.pieChart = this.getPieChart();
     }, 350);
     setTimeout(() => {
      this.barChart = this.getBarChart();
    }, 350);
  }

  // https://www.chartjs.org/docs/latest/samples/other-charts/doughnut.html PARA CREAR GRÁFICOS
  
  getChartPie(context, chartType, data, options?) {
    return new Chart(context, {
      data,
      options,
      type: chartType,
    });
  }

  getChartBar(context, chartType, data) {
    return new Chart(context, {
      data,
      type: chartType,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position:'top',
          },
          title: {
            display: true,
            text: 'Evolución en función del peso'
          }
        }
      }
    });
  }

  getPieChart() {

    const data = {
      labels: ['Peso en Kilogramos', 'Altura en cm.', '% Graso', '% Muscular', 'Cintura en cm.', 'Cadera en cm.', 'Abdomen en cm.'],
      datasets: [
        {
          data: [76, 176, 19.3, 52.4, 62.3, 74.5, 68,2],
          backgroundColor: ['#6cd5c0', '#a4c5df', '#009fbf', '#73ba9c', '#00b4ff', '#9fefcc', '#395c9c'],
          hoverBackgroundColor: ['#6cd5c0', '#a4c5df', '#009fbf', '#73ba9c', '#00b4ff', '#9fefcc', '#395c9c']
        }]
    };

    return this.getChartPie(this.pieCanvas.nativeElement, 'doughnut', data);
  }

  getBarChart() {

    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [
        // {
        //   label: 'Objetivo',
        //   data: [110, 110, 105, 100, 100, 95, 95, 90, 90, 90, 90, 88],
        //   borderColor: ['#a4c5df'],
        //   // backgroundColor: ['#a4c5df50']
        // },
        {
          label: 'Evolución del peso mensual',
          data: [115, 112, 108, 100, 105, 99, 95, 96, 94, 92, 93, 92],
          borderColor: ['#6cd5c0'],
          type: 'line',
          backgroundColor: ['#6cd5c040']
        }]
    };

    return this.getChartBar(this.barCanvas.nativeElement, 'bar', data);
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
