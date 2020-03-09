import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CheckEnvDirective } from '../../directives/check-env/check-env';
import { GuardModel } from './ui.models';

/*
  Generated class for the NavHelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NavHelperProvider {

  // Data Vars
  private data: any = {};
  private navController: NavController;


  // Control Vars
  private canPushPage: boolean = true;
  private isWeb: boolean;


  constructor(private platformEnv: CheckEnvDirective) {
    this.isWeb = this.platformEnv.checkEnvironment().split('_').filter(c => 'android_ios'.includes(c)).length === 0;
  }


  ngOnDestroy() {
    this.navController = undefined;
  }




  // *******************************************
  // UI Methods
  // *******************************************
  public push(page: string, data?: any, options: any = {}) {
    this.canPushPage ? this.navController.push(page, !!data ? data : this.data, this.refineOptions(options)).then(() => this.canPushPage = true) : this.canPushPage = false;
    this.canPushPage = false;
  }


  public pop(options: any = {}) {
    if (this.navController.length() > 1) {
      this.canPushPage ? this.navController.pop(this.refineOptions(options)).then(() => this.canPushPage = true) : this.canPushPage = false;
      this.canPushPage = false;
    }
  }


  public setRoot(page: string, data?: any, options: any = {}) {
    this.canPushPage ? this.navController.setRoot(page, !!data ? data : this.data, this.refineOptions(options)).then(() => { this.canPushPage = true; }) : this.canPushPage = false;
    this.canPushPage = false;
  }


  public goToLink(link: string) {
    window.open(link, this.isWeb ? '_blank' : '_self');
  }


  public popToPage(page: string, data?: any, options: any = {}) {
    if (this.navController.length() > 0) {
      const pages = this.navController.getActive().index;
      const popPage = this.navController.getViews().findIndex(v => v.id === page);

      if (popPage > -1) {
        this.navController.remove(popPage + 1, pages - popPage - 1);
        this.canPushPage ? this.navController.pop(this.refineOptions(options)).then(() => this.canPushPage = true) : this.canPushPage = false;
        this.canPushPage = false;
      } else {
        this.setRoot(page, data, options);
      }
    }
  }



  // *******************************************
  // SUPPORT Methods
  // *******************************************
  private refineOptions(options: any) {
    const newOptions = options;

    if (this.isWeb) {
      newOptions['animate'] = false;
    }

    return newOptions;
  }





  // *******************************************
  // SETTER / GETTER Methods
  // *******************************************
  public setNavController(nav: NavController) {
    this.navController = nav;
  }

  public setData(data) {
    this.data = data;
  }

  public setDataField(field: string, data: any) {
    this.data[field] = data;
  }


  // *******************************************
  // GUARDS Methods
  // *******************************************
  public isAuthenticated(guardAndPage: GuardModel[]): boolean {
    let canEnter: boolean = true;
    guardAndPage.forEach((g => {
      if (!g.guard && canEnter) {
        setTimeout(() => {
          this.setRoot(g.page);
        }, 10);
        canEnter = false;
      }
    }));
    return canEnter;
  }
}
