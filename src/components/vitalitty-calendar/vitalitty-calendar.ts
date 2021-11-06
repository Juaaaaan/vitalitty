import { Component, OnInit } from '@angular/core';

/**
 * Generated class for the VitalittyCalendarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'vitalitty-calendar',
  templateUrl: 'vitalitty-calendar.html'
})
export class VitalittyCalendarComponent implements OnInit {

  text: string;

  //variables
  private allDays = [];
  public daysInMonth = [];
  public allMonth = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  public nowDay: string = '';
  public nowMonth: string = '';
  public nowYear: string = '';

  constructor() {
    // console.log('Hello VitalittyCalendarComponent Component');
    // this.text = 'Hello World';
  }

  ngOnInit(): void {
    this.calculateDays();
    // AIzaSyCkAB6QW4_EDUW7yEGz29lvXdazOzKpvhE
  }
  
  private calculateDays() {
    for (let index = 0; index < 12; index++) {
      this.allDays.push(new Date(new Date().getFullYear(), index, 0).getDate());
    }
    this.nowDay = new Date().getDay().toString();
    this.nowMonth = new Date().getMonth().toString();
    this.nowYear = new Date().getFullYear.toString();
    // console.log(this.allDays[this.nowMonth]);
    for (let index = 1; index <= this.allDays[this.nowMonth]; index++) {
      this.daysInMonth.push(index);
    }
  }
}
