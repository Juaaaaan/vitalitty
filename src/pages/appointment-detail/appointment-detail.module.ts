import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentDetailPage } from './appointment-detail';
import { ComponentsModule } from '../../components/components.module';
// import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  declarations: [
    AppointmentDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentDetailPage),
    ComponentsModule
    // NgCalendarModule
  ],
})
export class AppointmentDetailPageModule {}
