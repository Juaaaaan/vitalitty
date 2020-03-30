import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';
import { AppInterceptorHelper } from './interceptor.helper';





@Injectable()
export class InterceptorProvider implements HttpInterceptor {

  private INTERCEPTOR_TIMEOUT: number = 30000;


  constructor(private interceptorHelper: AppInterceptorHelper) {

  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.interceptorHelper.manageRequestHeaders(request);
    request = this.interceptorHelper.setRequestHeaders(request);


    return next.handle(request)
      .timeout(this.INTERCEPTOR_TIMEOUT)
      .map(
        (response: HttpResponse<any>) => {
          if (response.body && typeof response.body === 'string') {
            try {
              const newBody = JSON.parse(response.body.replace(/"\s+|\s+"/g, '"'));
              response = response.clone({ body: newBody });
            } catch (error) { }
          }
          return response;
        }
      ).do(
        (success: HttpResponse<any>) => {
          this.interceptorHelper.manageSuccessResponse(success);
        },
        (error: HttpErrorResponse) => {
          this.interceptorHelper.manageErrorResponse(error);
        }
      );
  }
}
