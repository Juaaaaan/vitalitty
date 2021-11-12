import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { StorageProvider } from '../../shared/storage';
import { Chart } from 'chart.js';
import { Item } from '../../models/item';
import { Items } from '../../providers';
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
export class DashboardPage implements OnInit, OnDestroy {

  // Variables

  public slides: any[];
  showSkip = true;
  dir: string = 'ltr';
  currentItems: any = [];

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
    public platform: Platform,
    private menuCtrl: MenuController,
    public items: Items) {
      this.dir = platform.dir();
      this.isAdmin = this.navParams.get('isAdmin');
    }

    ionViewCanEnter(): boolean{
      if(this.storage.get('responseAdmin') === 1){
         return true;
       } else if (this.storage.get('responseAdmin') === 2) {
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
          header: 'Tienes a <b> &nbsp;Roberto Manrique&nbsp;</b> a las <b>&nbsp;10:00</b>',
          age: 'Edad: 33 años',
          email: 'vanesa.martin@vitalitty.com',
          observations: '<b>* Observaciones del cliente respecto a la dieta:</b> No me gustan los guisantes. Me cuesta cumplir la dieta dado que por temas laborales no puedo acomodarme. Necesito volver a repasarla'
        },
        {
          header: 'Tienes a <b>&nbsp;Vanesa Martín&nbsp;</b> a las <b>&nbsp;10:30</b>',
          age: 'Edad: 24 años',
          email: 'Email: vanesa.martin@vitalitty.com',
          observations: '<b>* Observaciones del cliente respecto a la dieta:</b> Estoy encantada, de momento la puedo seguir sin problemas'
        },
        {
          header: 'Tienes a <b>&nbsp;Roberto Manrique&nbsp;</b> a las <b>&nbsp;11:00&nbsp;</b>',
          age: 'Edad: 33 años',
          email: 'vanesa.martin@vitalitty.com',
          observations: '<b>* Observaciones del cliente respecto a la dieta:</b> No me gustan los guisantes. Me cuesta cumplir la dieta dado que por temas laborales no puedo acomodarme. Necesito volver a repasarla'
        },
        {
          header: 'Tienes a <b>&nbsp;Roberto Manrique&nbsp;</b> a las <b>&nbsp;11:30&nbsp;</b>',
          age: 'Edad: 33 años',
          email: 'vanesa.martin@vitalitty.com',
          observations: '<b>* Observaciones del cliente respecto a la dieta:</b> No me gustan los guisantes. Me cuesta cumplir la dieta dado que por temas laborales no puedo acomodarme. Necesito volver a repasarla'
        },
        {
          header: 'Tienes a <b>&nbsp;Roberto Manrique&nbsp;</b> a las <b>&nbsp;12:00&nbsp;</b>',
          age: 'Edad: 33 años',
          email: 'vanesa.martin@vitalitty.com',
          observations: '<b>* Observaciones del cliente respecto a la dieta:</b> No me gustan los guisantes. Me cuesta cumplir la dieta dado que por temas laborales no puedo acomodarme. Necesito volver a repasarla'
        },
        {
          header: 'Tienes a <b>&nbsp;Roberto Manrique&nbsp;</b> a las <b>&nbsp;12:30&nbsp;</b>',
          age: 'Edad: 33 años',
          email: 'vanesa.martin@vitalitty.com',
          observations: '<b>* Observaciones del cliente respecto a la dieta:</b> No me gustan los guisantes. Me cuesta cumplir la dieta dado que por temas laborales no puedo acomodarme. Necesito volver a repasarla'
        },
      ];
    }
  }

  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }


  menuDesplegable() {
    this.menuCtrl.toggle()
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  // https://www.chartjs.org/docs/latest/samples/other-charts/doughnut.html PARA CREAR GRÁFICOS
  
  getChartPie(context, chartType, data, options?) {
    return new Chart(context, {
      data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        }
      },
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
      labels: ['Peso en Kilogramos', 'Altura en cm', '% Graso', '% Muscular', 'Cintura en cm', 'Cadera en cm', 'Abdomen en cm'],
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

  ngOnDestroy():void {
    this.closeApp('WelcomePage');
  }

}
