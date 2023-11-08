import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/LoadingService';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private loadingSvc:LoadingService,
    public snackBar: MatSnackBar
    ){
  }

  intercept (
    request : HttpRequest<any>,
    next : HttpHandler,
  ) : Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log('response received');
      }
    }, (error : HttpErrorResponse) => {
      console.error(error);

      if (error.status === 401) {
        this.snackBar.open('您当前没有权限进行此操作，请登录后重试', "" , {
          duration: 2000,
        });
      } else if(error.status === 400){
        this.snackBar.open('请求参数异常', "" , {
          duration: 2000,
        });
      } else if(error.status === 403){
        this.snackBar.open('您当前没有权限进行此操作', "" , {
          duration: 2000,
        });
      }
      if(this.loadingSvc.isLoading === true){
        this.loadingSvc.isLoading = false;
      }
    }));
  }

}
