import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoadingController, Loading } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


export interface LoaderModel {
  dismisLoader?: boolean;
  loaderText?: string;
}


@Injectable()
export class LoaderHelperProvider {

  // Communicate Vars
  private loaderBehaviour = new BehaviorSubject<LoaderModel>({});

  // UI Vars
  private loaderInstance: Loading;



  constructor(public http: HttpClient, private loaderCtrl: LoadingController, private translate: TranslateService) {
    this.initialize();
  }

  private initialize() {
    this.loaderBehaviour.subscribe(
      (value: LoaderModel) => {

        if (value.loaderText) {
          if (!this.loaderInstance) {
            this.loaderInstance = this.loaderCtrl.create({ content: /* value.loaderText */ '' });
            this.loaderInstance.present();
          } else {
            this.loaderInstance.setContent(/* value.loaderText */ '');
          }
        }


        if (this.loaderInstance && value.dismisLoader) {
          this.loaderInstance.dismiss();
          this.loaderInstance = null;
        }
      }
    );
  }



  public showLoader(text: string) {
    const translatedText = this.translate.instant('LOADER_MESSAGES.TITLE');
    this.loaderBehaviour.next({ loaderText: translatedText });
  }

  public dismissLoader() {
    this.loaderBehaviour.next({ dismisLoader: true });
  }

}
