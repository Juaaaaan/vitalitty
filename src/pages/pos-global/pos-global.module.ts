import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PosGlobalPage } from './pos-global';

@NgModule({
  declarations: [
    PosGlobalPage,
  ],
  imports: [
    IonicPageModule.forChild(PosGlobalPage),
  ],
})
export class PosGlobalPageModule {}
