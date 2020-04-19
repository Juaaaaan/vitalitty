import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyProfilePage } from './my-profile';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MyProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(MyProfilePage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class MyProfilePageModule {}
