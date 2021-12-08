import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoogleCalendarPage } from './google-calendar';

@NgModule({
  declarations: [
    GoogleCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(GoogleCalendarPage),
  ],
})
export class GoogleCalendarPageModule {}
