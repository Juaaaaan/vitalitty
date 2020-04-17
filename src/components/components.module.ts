import { NgModule } from '@angular/core';
import { WritterComponent } from './writter/writter';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../pipes/pipes.module';
import { VitalittyFooterComponent } from './vitalitty-footer/vitalitty-footer';

@NgModule({
	declarations: [WritterComponent,
    VitalittyFooterComponent],
	imports: [
    IonicModule,
    TranslateModule.forChild(),
    PipesModule
  ],
	exports: [WritterComponent,
    VitalittyFooterComponent]
})
export class ComponentsModule {}
