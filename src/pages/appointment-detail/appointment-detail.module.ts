import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentDetailPage } from './appointment-detail';
import { ComponentsModule } from '../../components/components.module';
import { CalendarModule } from 'angular-calendar';

@NgModule({
  declarations: [
    AppointmentDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentDetailPage),
    ComponentsModule
  ],
})
export class AppointmentDetailPageModule {}
