import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { PoliciesPage } from './policies';
import { ComponentsModule } from '../../components/components.module';



@NgModule({
  declarations: [
    PoliciesPage,
  ],
  imports: [
    IonicPageModule.forChild(PoliciesPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class PoliciesPageModule {}
