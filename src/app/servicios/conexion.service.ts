import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Globales } from '../generales/globales';



@Injectable({
  providedIn: 'root'
})
export class ConexionService {
    /******************************************************************************************
    DESCRIPCIÓN:
      Componente que hace la solicitud de información al servidor de aplicaciones, en este caso
      un servicio en PHP.
    ******************************************************************************************/
  headers: HttpHeaders;
  urlBase:string="null";
  public componente:"";

  constructor(protected http: HttpClient) {
    this.urlBase=Globales.servidor;
    let token=localStorage.getItem('tkn')
    this.headers = new HttpHeaders({ 'content':"application/json",
      'content-type':"application/x-www-form-urlencoded; charset=UTF-8"});
  }

  public sermones(parametros, accion){
    /******************************************************************************************
    DESCRIPCIÓN:
      Hace las solicitudes relacionadas a la base de datos de SERMONES.
      Estas peticiones dan la funcionalidad de la página en la secciòn de herramientas->sermones
    PARAMETROS:
      parametros. Lista de parametros de la solicitud.
    RESULTADO:
      Estructura con los datos generados a partir de la solicitud.
    ******************************************************************************************/
    const cuerpo =  JSON.stringify({cn:{accion,seccion:"sermones", parametros} });
    return this.http.post(this.urlBase, cuerpo,  {headers:this.headers });
  }

  public narrativas(parametros, accion){
    /******************************************************************************************
    DESCRIPCIÓN:
      Hace las solicitudes relacionadas a la base de datos de RELACIONES.
      Estas peticiones dan la funcionalidad de la página en la secciòn de herramientas->relaciones.
    PARAMETROS:
      parametros. Lista de parametros de la solicitud.
    RESULTADO:
      Estructura con los datos generados a partir de la solicitud.
    ******************************************************************************************/
    const cuerpo =  JSON.stringify({cn:{accion, seccion:'narrativas', parametros} });
    return this.http.post(this.urlBase, cuerpo,  {headers:this.headers });
  }

  public novohisp(parametros, accion){
    /******************************************************************************************
    DESCRIPCIÓN:
      Hace las solicitudes relacionadas a la base de datos de NOVOHISP.
      Estas peticiones dan la funcionalidad al resto de las secciones de la página, que NO son las
      herramientas de sermones y relaciones.
    PARAMETROS:
      parametros. Lista de parametros de la solicitud.
      accion. Proceso que se desea ejecutar.
    RESULTADO:
      Estructura con los datos generados a partir de la solicitud.
    ******************************************************************************************/
    const cuerpo =  JSON.stringify({cn:{accion, seccion:'novohisp', parametros} });
    return this.http.post(this.urlBase, cuerpo,  {headers:this.headers });
  }

  public usuarios(parametros, accion){
    /******************************************************************************************
    DESCRIPCIÓN:
      Hace las solicitudes relacionadas a los usuarios, es decir, registro, actualización y eliminación
      de usuarios de esta aplicación.
      Estos procesos requieren de un token de autorización
    PARAMETROS:
      parametros. Lista de parametros de la solicitud.
      accion. Proceso que se desea ejecutar.
    RESULTADO:
      Estructura con los datos generados a partir de la solicitud.
    ******************************************************************************************/
    const cuerpo =  JSON.stringify({cn:{accion, seccion:'usuarios', parametros} });
    return this.http.post(this.urlBase, cuerpo,  {headers:this.headers });
  }

  public noticias(parametros, accion){
    /******************************************************************************************
    DESCRIPCIÓN:
      Hace las solicitudes relacionadas a la sección de noticias, es decir, al alta, modificación
      y eliminación de una noticia.
      Estos procesos requieren de un token de autorización
    PARAMETROS:
      parametros. Lista de parametros de la solicitud.
      accion. Proceso que se desea ejecutar.
    RESULTADO:
      Estructura con los datos generados a partir de la solicitud.
    ******************************************************************************************/
    let token=localStorage.getItem('tkn')
    if(token){
      this.headers.set('Authorization',token)
    }

    const cuerpo =  JSON.stringify({cn:{accion, seccion:'noticias', parametros} });
    return this.http.post(this.urlBase, cuerpo,  {headers:this.headers });
  }

  public noticias_sa(parametros, accion){
    /******************************************************************************************
    DESCRIPCIÓN:
      Hace las solicitudes relacionadas a la sección de noticias que no requieren de token de autorización
      basicamente, la consulta de las noticias vigentes.
    PARAMETROS:
      parametros. Lista de parametros de la solicitud.
      accion. Proceso que se desea ejecutar.
    RESULTADO:
      Estructura con los datos generados a partir de la solicitud.
    ******************************************************************************************/
    let headers = new HttpHeaders({ 'content':""});
    return this.http.post(this.urlBase, parametros,  {headers});
  }

  ejecutar(componente:string, parametros: any) {
    /******************************************************************************************
    DESCRIPCIÓN:
      invocación de un proceos generico. Actualmente no se usa.
    PARAMETROS:
      componente. nombre del proceso en el servidor que se desea ejecutar.
      parametros. parametros del proceso.
    RESULTADO:
      Estructura con los datos generados a partir de la solicitud.
    ******************************************************************************************/
    let url =  this.urlBase+"/"+componente;
    const cuerpo =  JSON.stringify({cn: parametros});
    return this.http.post( url,   cuerpo, {headers: this.headers});
  }
}
