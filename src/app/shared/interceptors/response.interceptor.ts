import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  intercept (
    request : HttpRequest<any>,
    next : HttpHandler,
  ) : Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log('response received');
      }
    }, (error : HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        console.error('您没有权限进行此操作，请登陆后重试');
      } else if(error.status === 400){
        console.log('请求参数异常');
      }
    }));
  }

}
