import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token=localStorage.getItem('tkn');
        let authReq;
        if(token!=null){
        console.log('El TOKEN: '+token);
        authReq = req.clone({
            headers: new HttpHeaders({
                'content':"application/json",
                'content-type':"application/x-www-form-urlencoded; charset=UTF-8",
                'Authorization':token
            })
        });
        }else{
            authReq = req.clone({
                headers: new HttpHeaders({
                    'content':"application/json",
                    'content-type':"application/x-www-form-urlencoded; charset=UTF-8",
                })
            });
        }
        console.log('Intercepted HTTP call', authReq);
        return next.handle(authReq);
    }
}