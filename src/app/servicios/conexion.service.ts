import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  headers: HttpHeaders;
  //urlBase:string='http://api.appsparatodos.com.mx';
  urlBase:string='/api';
  public componente:"";

  constructor(protected http: HttpClient) {
    this.headers = new HttpHeaders({ 'content':"application/json",
    'content-type':"application/x-www-form-urlencoded; charset=UTF-8"});
   //this.headers = new HttpHeaders({ 'content-type':"application/x-www-form-urlencoded"});
  }

  public sermones(parametros, accion){
    const cuerpo =  JSON.stringify({cn:{accion,seccion:"sermones", parametros} });
    return this.http.post(this.urlBase, cuerpo,  {headers:this.headers });
  }

  public narrativas(parametros, accion){
    const cuerpo =  JSON.stringify({cn:{accion, seccion:'narrativas', parametros} });
    return this.http.post(this.urlBase, cuerpo,  {headers:this.headers });
  }

  public novohisp(parametros, accion){
    const cuerpo =  JSON.stringify({cn:{accion, seccion:'novohisp', parametros} });
    return this.http.post(this.urlBase, cuerpo,  {headers:this.headers });
  }

  public usuarios(parametros, accion){
    const cuerpo =  JSON.stringify({cn:{accion, seccion:'usuarios', parametros} });
    return this.http.post(this.urlBase, cuerpo,  {headers:this.headers });
  }

  public noticias(parametros, accion){
    const cuerpo =  JSON.stringify({cn:{accion, seccion:'noticias', parametros} });
    return this.http.post(this.urlBase, cuerpo,  {headers:this.headers });
  }

  public noticias_sa(parametros, accion){
    let headers = new HttpHeaders({ 'content':""});
    return this.http.post(this.urlBase, parametros,  {headers});
  }

  ejecutar(componente:string, parametros: any) {
    let url =  this.urlBase+"/"+componente;
    const cuerpo =  JSON.stringify({cn: parametros});
    return this.http.post( url,   cuerpo, {headers: this.headers});
  }
}
