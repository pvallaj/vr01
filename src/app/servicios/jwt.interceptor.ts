import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  /******************************************************************************************
    DESCRIPCIÓN:
      Proceso de intercepción de peticiones. toma todas las peticiones realizadas por esta
      aplicación y las modifica con un token. Esto permite habilitar una sesión de usuario
      para los servicios que requieren de autenticación.
    ******************************************************************************************/
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /******************************************************************************************
        DESCRIPCIÓN:
          agrega un token a la petición. Si el token no existe, se envia la petición.
          sin token.
        PARAMETROS:
          req. petición a realizar.
        RESULTADO:
          se hace la petición con el token agregado o sin el, según sea el caso.
        ******************************************************************************************/
        const token: any = localStorage.getItem('tkn');
        let authReq;
        if ( token != null) {

        authReq = req.clone({
            headers: new HttpHeaders({
                Authorization: token,
                content: 'application/json',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }),
        });
        } else {
            authReq = req.clone({
                headers: new HttpHeaders({
                    content: 'application/json',
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                }),
            });
        }

        return next.handle(authReq);
    }
}
