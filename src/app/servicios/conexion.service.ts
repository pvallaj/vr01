import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  headers: HttpHeaders;
  urlBase:string='http://localhost:8000';
  constructor(protected http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  obtenerCatalogo(cat:string){
    return this.http.get(this.urlBase+'/catalogos/'+cat);
  }
  obtenerDetalleCatalogo(cat, idElemento){
    let headers = new HttpHeaders();
    headers.append('catalogo', cat);
    const cuerpo =  JSON.stringify({cn:{accion:'consulta',id:idElemento,catalogo:cat} });
    
    return this.http.post(this.urlBase+'/detalleCatalogos', cuerpo,  {headers:headers });
  }
  obtenerSermones(parametros){
    let headers = new HttpHeaders();
    const cuerpo =  JSON.stringify({cn:{accion:'consulta sermones', parametros} });
    
    return this.http.post(this.urlBase+'/sermones', cuerpo,  {headers:headers });
  }
}
