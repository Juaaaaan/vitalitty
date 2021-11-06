import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { StorageProvider } from '../../shared/storage';
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
export class DashboardPage implements OnInit {

  // Variables

  slides: any[];
  showSkip = true;
  dir: string = 'ltr';

  public newDate = new Date();
  public isAdmin: boolean = false;

  // Obtenga el elemento dom del lienzo correspondiente
	@ViewChild('pieCanvas') pieCanvas;
  @ViewChild('barCanvas') barCanvas;
	
  // Crear un nuevo objeto para inicializar
 pieChart: any;
 barChart: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: StorageProvider,
    private viewCtrl: ViewController,
    public platform: Platform) {
      this.dir = platform.dir();
      this.isAdmin = this.navParams.get('isAdmin');
    }

    ionViewCanEnter(): boolean{
      if(this.storage.get('responseAdmin') === 1){
         return true;
       } else {
         return false;
       }
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

  ngOnInit(): void {
    if (this.isAdmin) {
      this.slides = [
        {
          header: 'Tienes a Roberto Manrique a las 10:00',
          age: 'Edad: 33 años',
          weightHeight: 'Peso y estatura actual: 94,32kg',
          objectives: 'Objetivo: bajar de peso y pérdida de colesterol',
          vitalitty_time: 'Tiempo en Vitalitty: 2 años aproximadamente',
          evolution: 'Evolucion: favorable',
          email: 'vanesa.martin@vitalitty.com',
          observations: '<b>* Observaciones del cliente respecto a la dieta:</b> No me gustan los guisantes. Me cuesta cumplir la dieta dado que por temas laborales no puedo acomodarme. Necesito volver a repasarla'
        },
        {
          header: 'Tienes a Vanesa Martín a las 10:30',
          age: 'Edad: 24 años',
          weightHeight: 'Peso y altura actual: 51kg, 161cm',
          objectives: 'Objetivo: subida de peso de forma saludable',
          vitalitty_time: 'Tiempo en Vitalitty: 5 meses y 3 días',
          evolution: 'Evolución: satisfactoria',
          email: 'Email: vanesa.martin@vitalitty.com',
          observations: '<b>* Observaciones del cliente respecto a la dieta:</b> Estoy encantada, de momento la puedo seguir sin problemas'
        },
      ];
    }
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
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

    if (this.pieCanvas) {
      return this.getChartPie(this.pieCanvas.nativeElement, 'doughnut', data);
    }

  }

  getBarChart() {
    if (!this.isAdmin) {
      let allMonths = [];
      let monthOrdered = [];
      let monthOrdererNames = [];
      const monthLabels: string[] =  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

      const actuallyMonth = new Date().getMonth();
      for (let index = 0; index < 12; index++) {
        allMonths.push(index);
      }

      for (let index = actuallyMonth; index < 12; index++) {
        monthOrdered.push(index);
      }
      for (let index = 0; index < actuallyMonth; index++){
        monthOrdered.push(index);
      }
      for (let index = 0; index < monthOrdered.length; index++) {
        monthOrdererNames.push(monthLabels[monthOrdered[index]]);
      }

      console.log(monthOrdererNames);

      const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        // labels: monthOrdererNames,
        datasets: [
          {
            label: 'Objetivo de clientes',
            data: [0,0,0,0,0,0,0,0,0,0,20, 50],
            borderColor: ['#a4c5df'],
            backgroundColor: ['#a4c5df50'],
            type: 'line'
          },
          {
            label: 'Clientes actuales',
            data: [0,0,0,0,0,0,0,0,0,1,2,3],
            borderColor: ['#6cd5c0'],
            type: 'line',
            backgroundColor: ['#6cd5c040']
          }]
      };
      return this.getChartBar(this.barCanvas.nativeElement, 'line', data);

    } else {
      const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
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

  }



  public goToPage(page: string) {
    this.navCtrl.push(page);
  }
  
  public checkClient(client: number) {
    this.navCtrl.push('AppointmentDetailPage', client);
  } 

  public closeApp(page: string) {
    // window.localStorage.clear();
    this.storage.remove(['responseAdmin']);
    this.navCtrl.push(page).then(() => {
      const index = this.viewCtrl.index;
      this.navCtrl.remove(index);
    })
  }

}
