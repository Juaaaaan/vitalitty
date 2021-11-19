import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSecondPage } from './user-second';

@NgModule({
  declarations: [
    UserSecondPage,
  ],
  imports: [
    IonicPageModule.forChild(UserSecondPage),
  ],
})
export class UserSecondPageModule {}
