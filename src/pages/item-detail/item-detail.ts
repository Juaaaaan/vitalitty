import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Items } from '../../providers';
import { FormHelperProvider } from './../../providers/form-helper/form-helper';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PATTERNS } from '../../providers/validators/validators.patterns';
import { KeyValueModel } from '../../providers/ui/ui.models';
import { allEvolucionCliente, evolucionClient } from '../../providers/evoluciones/modules.evoluciones';
import { StorageProvider } from '../../shared/storage';
// import { ModalPage } from './modal-page';
@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
  providers: [
    FormHelperProvider
  ]
})
export class ItemDetailPage implements OnInit {
  item: any;
  diets: any = [];
  dietsComplete: number;
  barChart: any;
  evo: allEvolucionCliente[];
  firstElement: evolucionClient;

  @ViewChild('barCanvas') barCanvas;

  // Form Var
  public modifyInfoUser: FormGroup;
  // Control Vars
  private modifyInfoUserFormErrors = new Map<string, KeyValueModel[]>();

  constructor(public navCtrl: NavController, 
    navParams: NavParams,
    items: Items,
    private modalCtrl: ModalController,
    private formHelper: FormHelperProvider,
    private storage: StorageProvider) {

    this.item = navParams.get('item') || items.defaultItem;
    this.evo = navParams.get('evolucion') ? navParams.get('evolucion') : null;
    // this.modifyInfoUserFormErrors.set('email', [{ key: 'required', value: 'LOGIN.USER.NIF.ERROR' }, { key: 'pattern', value: 'LOGIN.USER.NIF.ERROR.PATTERN' }, { key: 'maxlength', value: 'LOGIN.USER.NIF.ERROR.PATTERN' }]);
  }

  // ionViewCanEnter(): boolean {
  //   return true
  //  }

  ngAfterViewInit() {
    // Inicializa el gráfico
     setTimeout(() => {
      this.barChart = this.getBarChart();
    }, 350);
  }

  ngOnInit(): void {
    if (this.item === null) {
      this.navCtrl.popToRoot();
    }
    this.modifyInfoUser = new FormGroup({
      peso: new FormControl('', [Validators.required]),
      altura: new FormControl('', [Validators.required]),
      grasa: new FormControl('', [Validators.required]),
      musculatura: new FormControl('', [Validators.required]),
      cintura: new FormControl('', [Validators.required]),
      cadera: new FormControl('', [Validators.required]),
      abdomen: new FormControl('', [Validators.required]),
      observaciones: new FormControl('', [Validators.required])
    });
    this.showSelectInfo();

    this.diets.push({
      "last_cita":"18/10/2021",
      "last_diet": "18/10/2021",
      "observations":"no me gusta el pepino"
    },
    {
      "last_cita":"18/10/2021",
      "last_diet":"21/09/2021",
      "observations":"No tengo tiempo de seguirla. He cambiado de trabajo"
    },
    {
      "last_cita":"18/10/2021",
      "last_diet":"01/08/2021",
      "observations":"No tengo tiempo de seguirla. He cambiado de trabajo"
    },
    {
      "last_cita":"18/10/2021",
      "last_diet":"01/08/2021",
      "observations":"No tengo tiempo de seguirla. He cambiado de trabajo"
    })
    this.dietsComplete = this.diets.length;
  }

  itemSelected(item) {
    window.open('www.google.es', '_blank');
  }

  modifyUser() {
    console.log('modify');
  }

  showSelectInfo() {
    if (this.evo && this.evo.length > 0) {
      console.log('PRIMER ELEMENTO:', this.firstElement);
      for (let index = 0; index < this.evo.length; index++) {
        if (index === 0) {
          console.log('HOLIII');
          const element = this.evo[index];
          this.firstElement = {
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
        }
        // const element = this.evo[index];
        console.log(element);
        }
      }
    } else {
      this.storage.remove(['responseAdmin']);
      this.navCtrl.push('WelcomePage');
    }
  }

  presentModal() {
    const modal = this.modalCtrl.create('WelcomePage');
    modal.present();
  }

  getBarChart() {
    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [
        {
          label: 'Evolución del peso mensual',
          data: [115, 112, 108, 100, 105, 99, 95, 96, 94, 92, 93, 92],
          borderColor: ['#6cd5c0'],
          type: 'line',
          backgroundColor: ['#6cd5c040']
        },
        {
          label: 'Objetivo',
          data: [95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95],
          borderColor: ['#6csd43'],
          type: 'line',
          // backgroundColor: ['#6csd4320']
        }]
    };
    return this.getChartBar(this.barCanvas.nativeElement, 'bar', data);
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

}
