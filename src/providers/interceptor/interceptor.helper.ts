import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AlertHelperProvider, AlertModel } from '../ui/alert';
import { LoaderHelperProvider } from '../ui/loader';
import { TimeoutError } from 'rxjs/util/TimeoutError';
// import moment from 'moment';




@Injectable()
export class AppInterceptorHelper {

    public isIE: boolean = false;
    private requestedAlertURLs: string[] = [];
    private requestAllURLs: string[] = [];


    constructor(private alert: AlertHelperProvider, private loader: LoaderHelperProvider) {
        if (/msie\s|trident\/|edge\//i.test(window.navigator.userAgent)) {
            this.isIE = true;
        }
    }


    // *******************************************
    // PREPARING REQUEST Methods
    // *******************************************
    public setRequestHeaders(request: HttpRequest<any>) {

        request = request.clone({
            headers: request.headers
                .delete('Content-Type')
                // .append('Content-Type', 'application/json')
                // .append('utc', moment().format('DD/M/YYYY HH:mm:ss'))
                .delete('show-error-alert')
                .delete('show-loading')
                .delete('loader-message')
        });


        // if (this.isIE) {
        //     request = request.clone({
        //         headers: request.headers
        //             // .append('Cache-Control', 'no-cache,no-store')
        //             // .append('Pragma', 'no-cache')
        //             // .append('Expires', 'Sat, 01 Jan 2100 00:00:00 GMT')
        //     });
        // }


        // if (request.url.includes('mapfre.com/srv/api/consentreceipts')) {
        //     request = request.clone({
        //         headers: request.headers
        //             // .append('Authorization', 'Basic ' + btoa('APPACIE:e6XdQJNOF'))
        //             .delete('utc')
        //             .delete('env')
        //     });
        // }


        return request;
    }


    public manageRequestHeaders(request: HttpRequest<any>) {
        const showLoader = request.headers.get('show-loading');
        const showAlert = request.headers.get('show-error-alert');
        const loadingText = request.headers.get('loader-message');


        // Shows loader or not if it receives "YES"
        if (request.url.includes('http')) {
            if (showLoader) {
                if (showLoader === 'YES') {
                    this.loader.showLoader(loadingText);
                }
            } else {
                this.loader.showLoader(' ');
                // this.loader.showLoader('LOADER_MESSAGES.DEFAULT');
            }
            this.requestAllURLs.push(request.url);
        }

        if (showAlert && showAlert === 'YES') {
            this.requestedAlertURLs.push(request.url);
        }
    }








    // *******************************************
    // INTERCEPTOR RESPONSE Methods
    // *******************************************
    public manageSuccessResponse(response: HttpResponse<any>) {
        const index = this.requestAllURLs.indexOf(response.url);
        if (index >= 0) {
            this.requestAllURLs.splice(this.requestAllURLs.indexOf(response.url), 1);
        }


        if (response instanceof HttpResponse && response.url.includes('http') && !response.url.includes('assets/') && this.requestAllURLs.length === 0) {
            this.loader.dismissLoader();
            this.checkAlertURL(response.url, response);
        }
    }


    public manageErrorResponse(response: HttpErrorResponse) {
        if (response instanceof HttpErrorResponse) {
            this.loader.dismissLoader();
        }

        if (response instanceof TimeoutError) {
            this.loader.dismissLoader();
        }
        this.requestAllURLs = [];
        this.checkAlertURL(response.url);
    }


    private checkAlertURL(url: string, response?: HttpResponse<any>) {
        const index = this.requestedAlertURLs.indexOf(url);
        const alertModel = <AlertModel>{};

        if (index > -1) {
            if ((response && !response.body) || !response || (response && response.body && !response.body.status)) {
                alertModel.title = 'BACK_ERROR_TITLES.GENERIC';
                alertModel.message = 'BACK_ERROR_CODES.GENERIC';
            } else if (response && response.body && response.body.status === 'KO') {
                alertModel.title = 'BACK_ERROR_TITLES.' + response.body.status_code.split('_')[0];
                alertModel.message = 'BACK_ERROR_CODES.' + response.body.status_code;
            }

            if (alertModel.title && alertModel.title !== 'BACK_ERROR_TITLES.CER') {
                this.requestedAlertURLs.splice(index, 1);
                this.alert.showAlert(alertModel);
            }

            this.requestedAlertURLs.splice(index, 1);
        }
    }
}
