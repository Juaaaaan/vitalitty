import { NgModule } from '@angular/core';
import { WritterComponent } from './writter/writter';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../pipes/pipes.module';
import { VitalittyFooterComponent } from './vitalitty-footer/vitalitty-footer';
import { VitalittyHeaderComponent } from './vitalitty-header/vitalitty-header';
import { VitalittyLoggedUserComponent } from './vitalitty-logged-user/vitalitty-logged-user';
import { IconTextComponent } from './icon-text/icon-text';
import { HeaderLogoutComponent } from './header-logout/header-logout';
import { AccordionComponent } from './accordion/accordion';

@NgModule({
	declarations: [WritterComponent,
    VitalittyFooterComponent,
    VitalittyHeaderComponent,
    VitalittyLoggedUserComponent,
    IconTextComponent,
    HeaderLogoutComponent,
    AccordionComponent],
	imports: [
    IonicModule,
    TranslateModule.forChild(),
    PipesModule
  ],
	exports: [WritterComponent,
    VitalittyFooterComponent,
    VitalittyHeaderComponent,
    VitalittyLoggedUserComponent,
    IconTextComponent,
    HeaderLogoutComponent,
    AccordionComponent]
})
export class ComponentsModule {}
