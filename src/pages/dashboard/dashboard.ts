import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { StorageProvider } from '../../shared/storage';
import { Chart } from 'chart.js';
import { Item } from '../../models/item';
import { Items } from '../../providers';
import { clientData } from '../../providers/user/modules.user';
import { EvolucionesProvider } from '../../providers/evoluciones/evoluciones';
import { allEvolucionCliente, evolucionClient } from '../../providers/evoluciones/modules.evoluciones';
import { allCitasCliente, citasClient, dietasClient } from '../../providers/citas/modules.citas';
import { CitasProvider } from '../../providers/citas/citas';

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
  public isAdmin: number;
  public userDataToSearch: any;
  private userDataEvolution: evolucionClient[];
  private userDataDietas: dietasClient[];

  public nombreCliente: string = '';
  public generoCliente: string = '';

  public fechaDietaCliente: string = '';
  public urlDietaCliente: string = '';

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
    public items: Items,
    public evolucionesProvider: EvolucionesProvider,
    public citasProvider: CitasProvider) {
      this.dir = platform.dir();
      this.isAdmin = this.navParams.get('isAdmin');
      this.userDataToSearch = this.navParams.get('allDataUser');
      this.userDataEvolution = this.navParams.get('oneEvolution');
      this.userDataDietas = this.navParams.get('dietas');
    }

    ionViewCanEnter(): boolean{
      if(this.storage.get('responseAdmin') === 1){
        if (this.userDataToSearch) { 
          return true;
        } 
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
    if (this.isAdmin === 1) {
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
      this.parseItemsUser();
    }
    if (this.isAdmin === 2) {
      this.parseUserData();
      this.parseDietasData();
    }
  }


  private parseItemsUser() {
    this.items.getDataClients(this.userDataToSearch);
  }

  private parseUserData() {
    for (let index = 0; index < this.userDataToSearch.length; index++) {
      const element = this.userDataToSearch[index];
      this.nombreCliente = element[2];
      this.generoCliente = element[8];
   }
  }

  parseDietasData() {
    console.log(this.userDataDietas);
    for (let index = 0; index < this.userDataDietas.length; index++) {
      const element = this.userDataDietas[index];
      this.fechaDietaCliente = element[4];
      this.urlDietaCliente = element[3];

    }
  }

  getPdf(){
    console.log(this.urlDietaCliente);
    window.open(this.urlDietaCliente, '_blank');
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

  async openItem(item: Item) {
    let responseParsed: evolucionClient[];
    let responseCitasParsed: citasClient[];
    let responseDietasParsed: dietasClient[];
    let responseAllParsed: any[];
    await this.evolucionesProvider.getAllClientEvolucion(item).subscribe((res: allEvolucionCliente) => {
      if (res) {
        console.log(res);
        responseParsed = this.parseEvoluciones(res.body);
      }
      this.evolucionesProvider.getAllClientEvolucion(item).subscribe((resEvo: allEvolucionCliente) => {
        if(resEvo) {
          responseAllParsed = this.parseAllEvoluciones(resEvo.body);
        }
      })
      this.citasProvider.getClientesCitas(item).subscribe((response: allCitasCliente) => {
        if (response) {
          responseCitasParsed = this.parseCitas(response.body);
          responseDietasParsed = this.parseDietas(response.body);
        }
      })
    })
    setTimeout(() => {
      this.goToItemDetail(item, responseParsed, responseAllParsed, responseCitasParsed, responseDietasParsed)
    }, 1000);


  }

  goToItemDetail(propioItem, infoUser, evoluciones, citas, dietas) {
    setTimeout(() => {
      this.navCtrl.push('ItemDetailPage', {
        item: propioItem,
        evolucion: infoUser,
        citas: citas,
        allEvolucion: evoluciones,
        dietas: dietas
      });
    }, 1000);

  }


  parseEvoluciones(body) {
    let bodyParsed: evolucionClient[] = [];
    for (let index = 0; index < body.evolucion.length; index++) {
      const element = body.evolucion[index];
      bodyParsed.push({
        id_evolucion: element[0],
        id_cita: element[1],
        id_cliente: element[2],
        peso: element[3],
        altura: element[4],
        porcentaje_graso: element[5],
        porcentaje_muscular: element[6],
        cintura: element[7],
        cadera: element[8],
        abdomen: element[9],
        fecha_evolucion: element[10]
      })
    }
    return bodyParsed
  }

  parseAllEvoluciones(body) {
    let bodyAllParsed: evolucionClient[] = [];
    for (let index = 0; index < body.evolucion.length; index++) {
      const element = body.evolucion[index];
      bodyAllParsed.push({
        id_evolucion: element[0],
        id_cita: element[1],
        id_cliente: element[2],
        peso: element[3],
        altura: element[4],
        porcentaje_graso: element[5],
        porcentaje_muscular: element[6],
        cintura: element[7],
        cadera: element[8],
        abdomen: element[9],
        fecha_evolucion: element[10]
      })
    }
    return bodyAllParsed;
  }

  parseCitas(body) {
    let bodyParsed: citasClient[] = [];
    for (let index = 0; index < body.citas.length; index++) {
      const element = body.citas[index];
      bodyParsed.push({
        id_cita: element[0],
        id_cliente: element[1],
        id_dieta: element[2],
        notas_cita: element[3],
        fecha_cita: element[4],
        cita_con_dieta: element[5],
      })
    }
    return bodyParsed
  }

  parseDietas(body) {
    let bodyParsedDietas: dietasClient[] = [];
    for (let index = 0; index < body.dietas.length; index++) {
      const element = body.dietas[index];
      bodyParsedDietas.push({
        id_dieta: element[0],
        id_clientes: element[1],
        dietas_historica: element[2],
        url_dieta: element[3],
        fecha_subida_pdf: element[4],
        id_dieta_user: element[5],
        observaciones_dieta: element[6]
      })
    }
    return bodyParsedDietas;
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
    let dataUserInfoPie = [];
    let dataUserMockPie = [];
    let data = {};
    if (this.userDataEvolution) {
      data = {
        labels: ['Peso en Kilogramos', 'Altura en cm', '% Graso', '% Muscular', 'Cintura en cm', 'Cadera en cm', 'Abdomen en cm'],
        datasets: [
          {
            data: [this.userDataEvolution[0][3], this.userDataEvolution[0][4], 
            this.userDataEvolution[0][5], this.userDataEvolution[0][6],
            this.userDataEvolution[0][7], this.userDataEvolution[0][8],
            this.userDataEvolution[0][9]],
            backgroundColor: ['#6cd5c0', '#a4c5df', '#009fbf', '#73ba9c', '#00b4ff', '#9fefcc', '#395c9c'],
            hoverBackgroundColor: ['#6cd5c0', '#a4c5df', '#009fbf', '#73ba9c', '#00b4ff', '#9fefcc', '#395c9c']
          }]
      };
    } else {
      dataUserMockPie = [76, 176, 19.3, 52.4, 62.3, 74.5, 68,2]
    }

    if (this.pieCanvas) {
      return this.getChartPie(this.pieCanvas.nativeElement, 'doughnut', data);
    }

  }

  getBarChart() {
    if (this.isAdmin == 2) {
      let xLabels: string[] = [];
      let yLabels: string[] = [];
      let zLabels: string[] = [];
      let pLabels: string[] = [];
      const mockXLabel = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      const mockYLabel = [0, 10, 20, 30, 40, 50, 60, 50, 70, 60, 50, 40];
      const mockZLabel = [95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95];
      if (this.userDataEvolution && this.userDataEvolution) {
        for (let index = 0; index < this.userDataEvolution.length; index++) {
          const element = this.userDataEvolution[index];
          xLabels.push(element[10])
          yLabels.push(element[3]);
          zLabels.push(element[5]);
          pLabels.push(element[6]);
        }
      }
      const data = {
        labels: xLabels ? xLabels : mockXLabel,
        datasets: [
          {
            label: 'Evolución del peso',
            data: yLabels ? yLabels : mockYLabel,
            borderColor: ['#6cd5c0'],
            type: 'line',
            backgroundColor: ['#6cd5c040']
          },
          {
            label: 'Porcentaje graso',
            data: zLabels ? zLabels : mockZLabel,
            // data: [95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95],
            borderColor: ['#6csd43'],
            type: 'line',
            // backgroundColor: ['#6csd4320']
          },
          {
            label: 'Porcentaje muscular',
            data: pLabels ? pLabels : mockZLabel,
            // data: [95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95],
            borderColor: ['#338dff'],
            type: 'line',
            // backgroundColor: ['#6csd4320']
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
