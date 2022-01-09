import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Items, User } from '../../providers';
import { FormHelperProvider } from './../../providers/form-helper/form-helper';
import { FormGroup, FormControl } from '@angular/forms';
import { allEvolutionInChart, evolucionClient } from '../../providers/evoluciones/modules.evoluciones';
import { allCitasCliente, citasClient, dietasClient } from '../../providers/citas/modules.citas';
import { CitasProvider } from '../../providers/citas/citas';
import { EvolucionesProvider } from '../../providers/evoluciones/evoluciones';
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
  evo: evolucionClient[];
  citas: citasClient[];
  firstElement: evolucionClient;
  allEvolution: evolucionClient[];
  dietas: dietasClient[];

  @ViewChild('barCanvas') barCanvas;

  // Form Var
  public modifyInfoUser: FormGroup;
  // Control Vars
  // public modifyInfoUserFormErrors = new Map<string, KeyValueModel[]>();

  constructor(public navCtrl: NavController, 
    navParams: NavParams,
    items: Items,
    private user: User,
    private alertCtrl: AlertController,
    private citasProvider: CitasProvider, 
    private evolucionesProvider: EvolucionesProvider) {

    this.item = navParams.get('item') || items.defaultItem;
    this.evo = navParams.get('evolucion') ? navParams.get('evolucion') : null;
    this.citas = navParams.get('citas') ? navParams.get('citas') : null;
    this.allEvolution = navParams.get('allEvolucion') ? navParams.get('allEvolucion') : null;
    this.dietas = navParams.get('dietas') ? navParams.get('dietas') : null;
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
      peso: new FormControl('', []),
      altura: new FormControl('', []),
      grasa: new FormControl('', []),
      musculatura: new FormControl('', []),
      cintura: new FormControl('', []),
      cadera: new FormControl('', []),
      abdomen: new FormControl('', []),
      observaciones: new FormControl('', [])
    });
    this.showSelectInfo();

    if (this.citas) {
      let fechaDieta: string = '';
      let urlDieta: string = '';
      let fechaCitaParsed = '';
      for (let index = 0; index < this.citas.length; index++) {
        const element = this.citas[index];
        if (element && element.fecha_cita.includes('T')) {
          fechaCitaParsed = element.fecha_cita.split('T')[0];
        } else if (element && element.fecha_cita.includes(' ')) {
          fechaCitaParsed = element.fecha_cita.split(' ')[0];
        }
        
        for (let index = 0; index < this.dietas.length; index++) {
          const element = this.dietas[index];
          if (element.fecha_subida_pdf == fechaCitaParsed) {
            fechaDieta = element.fecha_subida_pdf;
            urlDieta = element.url_dieta;
          } else {
            fechaDieta = '';
          }
        }

        this.diets.push({
          "last_cita": fechaCitaParsed ? fechaCitaParsed : element.fecha_cita,
          "last_diet": fechaDieta ? fechaDieta : element.id_dieta,
          "observations": element.notas_cita,
          "url_dieta": urlDieta ? urlDieta : ''
        })
        
      }
    }
    this.dietsComplete = this.diets.length;
  }


  public letPdf(dieta) {
    console.log(dieta.url_dieta);
    if (dieta.url_dieta) {
      console.log(dieta.url_dieta);
      window.open(dieta.url_dieta, '_blank');
    }
  }


  async createCalendarEvent() {
    let arrDataCita = [];
    let alert = this.alertCtrl.create({
      title: 'Concretar una cita',
      subTitle: 'Al aceptar una cita, se guardará automáticamente en tu calendario que podrás revisar en el dashboard',
      inputs: [
        {
          name: 'fecha',
          placeholder: 'Fecha',
          type: 'date',
        },
        {
          name: 'hora',
          placeholder: 'Hora',
          type: 'time',
        },
        {
          name: 'notasCita',
          placeholder: '¿Alguna nota para la cita?',
          type: 'text',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Crear cita',
          handler: data => {
            if (data) {
              let fechaFin = data.hora;
              let horafecha = parseInt(data.hora.split(':')[0]);
              let minuteshora = parseInt(data.hora.split(':')[1]);
              let minuteshoraFinCita = minuteshora + 30;

              if (minuteshoraFinCita >= 60) {
                horafecha = horafecha + 1;
                minuteshoraFinCita = minuteshoraFinCita - 60;
              }
              
              fechaFin = horafecha.toString().concat(':').concat(minuteshoraFinCita.toString());

              arrDataCita.push(this.firstElement.id_cliente, data.fecha + "T" + data.hora, data.hora, data.notasCita)
              this.citasProvider.postClientesCitas(arrDataCita);


              // https://calendar.google.com/calendar/u/0?cid=anVhbjExODU3QGdtYWlsLmNvbQ
              // const URL: string = 'https://www.googleapis.com/calendar/v3/calendars/juan11857@gmail.com/events';
              let eventBody: object = {
                "end": {
                  "dateTime": data.fecha + "T" + fechaFin,
                  "timeZone": "America/Los_Angeles"
                },
                "start": {
                  "dateTime": data.fecha + "T" + data.hora,
                  "timeZone": "America/Los_Angeles"
                },
                "attendees": [
                  {
                    "email": "suarezramirezjuanjose@hotmail.com"
                  }
                ],
                "description": "ESTO ES OTRA PRUEBA"
              }
              this.user.createEventCalendarUser(eventBody).subscribe((res) => {
                console.log(res);
                })
              // logged in!
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    alert.present();

  }

  showSelectInfo() {
    if (this.evo && this.evo.length > 0) {
      for (let index = 0; index < this.evo.length; index++) {
        if (index === 0) {
          const element = this.evo[index];
          this.firstElement = {
            id_evolucion: element.id_evolucion,
            id_cita: element.id_cita,
            id_cliente: element.id_cliente,
            peso: element.peso ? element.peso : 0,
            altura: element.altura ? element.altura : 0,
            porcentaje_graso: element.porcentaje_graso ? element.porcentaje_graso : 0,
            porcentaje_muscular: element.porcentaje_muscular ? element.porcentaje_muscular : 0,
            cintura: element.cintura ? element.cintura : 0,
            cadera: element.cadera ? element.cadera : 0,
            abdomen: element.abdomen ? element.abdomen : 0,
            fecha_evolucion: element.fecha_evolucion
          }
        }
      }
    }
  }

  parseAllEvolution(){
    let parsedAllEvo: allEvolutionInChart[] = [];
    if (this.allEvolution) {
      for (let index = 0; index < this.allEvolution.length; index++) {
        const element = this.allEvolution[index];
        parsedAllEvo.push({
          fecha: element.fecha_evolucion ? element.fecha_evolucion.toString() : element[10].toString(),
          peso: element.peso ? element.peso.toString() : element[3] ? element[3].toString() : 0 ,
          graso: element.porcentaje_graso ? element.porcentaje_graso.toString() : element[5] ? element[5].toString() : 0,
          muscular: element.porcentaje_muscular ? element.porcentaje_muscular.toString() : element [6] ? element[6].toString() : 0
        })
      }
    }
    return parsedAllEvo;
  }

  getBarChart() {
    const dataEvo = this.parseAllEvolution();
    let xLabels: string[] = [];
    let yLabels: string[] = [];
    let zLabels: string[] = [];
    let pLabels: string[] = [];
    const mockXLabel = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const mockYLabel = [0, 10, 20, 30, 40, 50, 60, 50, 70, 60, 50, 40];
    const mockZLabel = [95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95];
    for (let index = 0; index < dataEvo.length; index++) {
      const element = dataEvo[index];
      xLabels.push(element.fecha)
      yLabels.push(element.peso);
      zLabels.push(element.graso);
      pLabels.push(element.muscular);
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


  async modifyPacienteInfo() {
    let objPaciente: evolucionClient = {
        id_cita: 0,
        id_cliente: this.firstElement.id_cliente,
        peso: this.modifyInfoUser.value.peso ? this.modifyInfoUser.value.peso : this.firstElement.peso,
        altura: this.modifyInfoUser.value.altura ? this.modifyInfoUser.value.altura : this.firstElement.altura,
        porcentaje_graso: this.modifyInfoUser.value.grasa ? this.modifyInfoUser.value.grasa : this.firstElement.porcentaje_graso,
        porcentaje_muscular: this.modifyInfoUser.value.musculatura ? this.modifyInfoUser.value.musculatura : this.firstElement.porcentaje_muscular,
        cintura: this.modifyInfoUser.value.cintura ? this.modifyInfoUser.value.cintura : this.firstElement.cintura,
        cadera: this.modifyInfoUser.value.cadera ? this.modifyInfoUser.value.cadera : this.firstElement.cadera,
        abdomen: this.modifyInfoUser.value.abdomen ? this.modifyInfoUser.value.abdomen : this.firstElement.abdomen,
    }
    await this.evolucionesProvider.addClientEvolucion(objPaciente).subscribe((res) => {
      if (res) {
        this.evolucionesProvider.getAllClientEvolucion(this.firstElement).subscribe((resEvo: any) => {
          if(resEvo) {
            this.allEvolution = resEvo.body.evolucion;
            this.getBarChart();
            // responseAllParsed = this.parseAllEvoluciones(resEvo.body);
          }
        })
        this.citasProvider.getClientesCitas(this.firstElement).subscribe((response: allCitasCliente) => {
          if (response) {
            console.log(response);
            // responseCitasParsed = this.parseCitas(response.body);
          }
        })
      }
    })

  }

}
